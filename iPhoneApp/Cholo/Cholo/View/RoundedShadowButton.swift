//
//  RoundedGradeintButton.swift
//  Cholo
//
//  Created by Pritom  Mazumder on 3/29/18.
//  Copyright © 2018 Pritom  Mazumder. All rights reserved.
//

import UIKit


class RoundedShadowButton: UIButton {
    
    var originalSize:CGRect?
    
    func setupView(){
        originalSize = self.frame
        self.layer.cornerRadius = 5.0
        self.layer.shadowRadius = 10.0
        self.layer.shadowColor = UIColor.darkGray.cgColor
        self.layer.shadowOpacity = 0.5
        self.layer.shadowOffset = CGSize.zero
    }
    override func awakeFromNib() {
        setupView()
    }
    
    func animateButton(shouldLoad: Bool, withMessage message: String?){
        //MARK:: Setting Up all the animation and Properties to Spinner
        let spinner = UIActivityIndicatorView()
        spinner.activityIndicatorViewStyle = .whiteLarge
        spinner.color = #colorLiteral(red: 0.9866736531, green: 0.5069639087, blue: 0.4936044812, alpha: 1)
        spinner.alpha = 0.0
        spinner.hidesWhenStopped = true
        spinner.tag = 21
        
        
        if shouldLoad{
            //MARK:: Does all the animation and setting up the properties if button starts loading
            self.addSubview(spinner)
            self.setTitle("", for: .normal) //It removes the Title
            UIView.animate(withDuration: 0.3, animations: {
                self.layer.cornerRadius = self.frame.height / 2 //Making it Cicular
                self.frame = CGRect(x: self.frame.midX - (self.frame.height / 2), y: self.frame.origin.y, width: self.frame.height, height: self.frame.height) //Setting up all the properties of the positon of spinning
            }, completion: { (finished) in
                if finished == true{
                    spinner.startAnimating()
                    spinner.center = CGPoint(x: self.frame.width / 2 + 1, y: self.frame.width / 2 + 1)
                    spinner.fadeTo(alphaValue: 1.0, withDuration: 0.3)
                }
            })
            self.isUserInteractionEnabled = false
        }else{
            self.isUserInteractionEnabled = true
            
            for subview in self.subviews{
                if subview.tag == 21{
                    subview.removeFromSuperview()
                }
            }
            UIView.animate(withDuration: 0.2, animations: {
                self.layer.cornerRadius = 5.0
                self.frame = self.originalSize!
                self.setTitle(message, for: .normal)
            })
        }
    }

}
