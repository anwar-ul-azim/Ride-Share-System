//
//  UIViewExtension.swift
//  Cholo
//
//  Created by Pritom  Mazumder on 3/31/18.
//  Copyright © 2018 Pritom  Mazumder. All rights reserved.
//

import UIKit

extension UIView {
    func fadeTo(alphaValue: CGFloat, withDuration duration: TimeInterval){
        UIView.animate(withDuration: duration) {
            self.alpha = alphaValue
        }
    }
}
