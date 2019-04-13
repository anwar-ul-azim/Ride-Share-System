//
//  CircleView.swift
//  Cholo
//
//  Created by Pritom  Mazumder on 3/29/18.
//  Copyright © 2018 Pritom  Mazumder. All rights reserved.
//

import UIKit

class CircleView: UIView {

    //We've to declare the IBInspectable to setup border color for two different views
    @IBInspectable var borderColor: UIColor? {
        didSet{
            setupView()
        }
    }
    
    override func awakeFromNib() {
        setupView()
    }
    
    func setupView(){
        //Making the view circular
        self.layer.cornerRadius = self.frame.width / 2
        //Setting up the border width
        self.layer.borderWidth = 1.5
        //setting up the border color
        self.layer.borderColor = borderColor?.cgColor
    }

}
