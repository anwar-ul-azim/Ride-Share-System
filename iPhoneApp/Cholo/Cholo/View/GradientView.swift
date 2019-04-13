//
//  GradientView.swift
//  Cholo
//
//  Created by Pritom  Mazumder on 3/30/18.
//  Copyright © 2018 Pritom  Mazumder. All rights reserved.
//

import UIKit

@IBDesignable

class GradientView: UIView {

    @IBInspectable var topColor: UIColor = #colorLiteral(red: 0.968627451, green: 0.4392156863, blue: 0.3843137255, alpha: 1){
        didSet{
            self.setNeedsLayout()
        }
    }
    @IBInspectable var bottomColor: UIColor = #colorLiteral(red: 0.9960784314, green: 0.3176470588, blue: 0.5882352941, alpha: 1){
        didSet{
            self.setNeedsLayout()
        }
    }
    
    override func layoutSubviews() {
        let gradintLayer = CAGradientLayer()
        gradintLayer.colors = [topColor.cgColor,bottomColor.cgColor]
        gradintLayer.startPoint = CGPoint(x: 0, y: 0)
        gradintLayer.endPoint = CGPoint(x: 1, y: 1)
        gradintLayer.frame = self.bounds
        self.layer.insertSublayer(gradintLayer, at: 0)
        
    }
}
