//
//  RoundedShadowView.swift
//  Cholo
//
//  Created by Pritom  Mazumder on 3/29/18.
//  Copyright © 2018 Pritom  Mazumder. All rights reserved.
//

import UIKit

class RoundedShadowView: UIView {
    
    override func awakeFromNib() {
        setupView()
    }

    func setupView(){
        self.layer.cornerRadius = 5.0
        self.layer.shadowOpacity = 0.5
        self.layer.shadowColor = UIColor.darkGray.cgColor
        self.layer.shadowRadius = 10.0
        self.layer.shadowOffset = CGSize(width: 0, height: 5)
    }
}
