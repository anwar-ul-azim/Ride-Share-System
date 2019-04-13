//
//  ContainerVC.swift
//  Cholo
//
//  Created by Pritom  Mazumder on 3/30/18.
//  Copyright © 2018 Pritom  Mazumder. All rights reserved.
//

import UIKit
import QuartzCore

enum SlideOutState {
    case collapsed
    case leftPanelExpanded
}

enum showWhichVC {
    case homeVC
}

var showVC: showWhichVC = .homeVC

class ContainerVC: UIViewController {
    
    //MARK:: Variables
    var homeVC: HomeVC! //We're setting it HomeVC because when the application opens HomeVC should be shown
    var leftVC: LeftSidePanelVC!
    var centerController: UIViewController!
    var currentState: SlideOutState = .collapsed{
        didSet{
            let shouldShowShadow = (currentState != .collapsed)
            
            shouldShowShadowForCenterViewController(status: shouldShowShadow)
        }
    }
    //we're setting it to collapsed because when the application opens the sliding menu should be collapsed
    
    var isHidden = false //The status bar hidden or not
    let centerPanelExpandedOffset: CGFloat = 120
    var tap: UITapGestureRecognizer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initCenter(screen: showVC)
    }
    
    func initCenter(screen: showWhichVC){
        var presentingController: UIViewController
        
        showVC = screen
        
        if homeVC == nil {
            homeVC = UIStoryboard.homeVC()
            homeVC.delegate = self
        }
        
        presentingController = homeVC
        
        if let con = centerController {
            con.view.removeFromSuperview()
            con.removeFromParentViewController()
        }
        centerController = presentingController
        
        view.addSubview(centerController.view)
        addChildViewController(centerController)
        centerController.didMove(toParentViewController: self)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override var preferredStatusBarUpdateAnimation: UIStatusBarAnimation{
        return UIStatusBarAnimation.slide
    }
    
    override var prefersStatusBarHidden: Bool{
        return isHidden
    }

}
//We're  not setting it as private because we need to access it from the other part of the application
extension ContainerVC: CenterVCDelegate {
    func toggleLeftPanel() {
        //a variable to understand whether the left pannel collpsed or not
        let notAlreadyExpanded = (currentState != .leftPanelExpanded)
        
        if notAlreadyExpanded{
            addLeftPanelViewController()
        }
        //After adding it to the current view controller we animate it!
        animateLeftPanel(shouldExpand: notAlreadyExpanded)
    }
    
    func addLeftPanelViewController() {
        if leftVC == nil {
            //If leftVC isn't nil then we're adding the leftviewcontroller(LeftSidePanelVC)
            leftVC = UIStoryboard.leftViewContoller()
            //then we're adding the leftVC  beneath the current VC
            addChildSidePanelViewController(leftVC!)
        }
    }
    //This function which is the subview controller actually inserting a subview over the back view
    func addChildSidePanelViewController(_ sidePanelController: LeftSidePanelVC){
        view.insertSubview(sidePanelController.view, at: 0)
        addChildViewController(sidePanelController)//We're adding the view controller
        sidePanelController.didMove(toParentViewController: self)//Now we're moving it to ContainerVC
    }
    
    @objc func animateLeftPanel(shouldExpand: Bool) {
        //When the sliding menu bar opens it becomes true and when it doesn't open, it becomes false
        if shouldExpand {
            isHidden = !isHidden
            animateStatusBar()
            
            setupWhiteCoverView()
            
            currentState = .leftPanelExpanded
            //It'll take up the whole screen except 160px from left after sliding left
            animateCenterPanelXPosition(targetPosition: centerController.view.frame.width - centerPanelExpandedOffset)
        } else {
            isHidden = !isHidden
            animateStatusBar()
            
            hideWhiteCoverView()
            
            animateCenterPanelXPosition(targetPosition: 0, completion: { (finished) in
                if finished == true {
                    self.currentState = .collapsed
                    self.leftVC = nil
                }
            })
        }
    }
    
    func animateCenterPanelXPosition(targetPosition: CGFloat, completion: ((Bool) -> Void)! = nil){
        UIView.animate(withDuration: 0.8, delay: 0, usingSpringWithDamping: 0.8, initialSpringVelocity: 0, options: .curveEaseInOut, animations: {
            self.centerController.view.frame.origin.x = targetPosition
        }, completion: completion)
    }
    
    func animateStatusBar(){
        UIView.animate(withDuration: 0.8, delay: 0, usingSpringWithDamping: 0.8, initialSpringVelocity: 0, options: .curveEaseInOut, animations: {
            self.setNeedsStatusBarAppearanceUpdate()
        })
    }
    
    func setupWhiteCoverView(){
        let whiteCoverView = UIView(frame: CGRect(x: 0, y: 0, width: view.frame.width, height: view.frame.height))
        whiteCoverView.alpha = 0.0 //Setting to 0 to initially show no opacity before sliding up
        whiteCoverView.backgroundColor = UIColor.white
        whiteCoverView.tag = 25
        
        self.centerController.view.addSubview(whiteCoverView)
        whiteCoverView.fadeTo(alphaValue: 0.75, withDuration: 0.2)
        tap = UITapGestureRecognizer(target: self, action: #selector(animateLeftPanel(shouldExpand:)))
        tap.numberOfTapsRequired = 1
        
        self.centerController.view.addGestureRecognizer(tap)
    }
    
    func hideWhiteCoverView(){
        centerController.view.removeGestureRecognizer(tap)
        for subview in self.centerController.view.subviews {
            if subview.tag == 25{
                UIView.animate(withDuration: 0.2, animations: {
                    subview.alpha = 0.0
                }, completion: { (finished) in
                    subview.removeFromSuperview()
                })
            }
        }
        //The purpose of this function is that, when it slides left it just shows an animation rather then completly shutting down
    }
    
    func shouldShowShadowForCenterViewController(status: Bool){
        if status == true {
            centerController.view.layer.shadowOpacity = 0.6
        }else{
            centerController.view.layer.shadowOpacity = 0.0
        }
    }
}

//We're setting it to private because only Container VC can access it!
private extension UIStoryboard{
    class func mainStoryboard() -> UIStoryboard{
        return UIStoryboard(name: "Main", bundle: Bundle.main)
    }
    
    class func leftViewContoller() -> LeftSidePanelVC? {
        return mainStoryboard().instantiateViewController(withIdentifier: "LeftSidePanelVC") as? LeftSidePanelVC
    }
    
    class func homeVC() -> HomeVC? {
        return mainStoryboard().instantiateViewController(withIdentifier: "HomeVC") as? HomeVC
    }
}








