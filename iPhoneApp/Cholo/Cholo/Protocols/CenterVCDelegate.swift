//
//  CenterVCDelegate.swift
//  Cholo
//
//  Created by Pritom  Mazumder on 3/30/18.
//  Copyright © 2018 Pritom  Mazumder. All rights reserved.
//

import UIKit

protocol CenterVCDelegate{
    func toggleLeftPanel()
    func addLeftPanelViewController()
    func animateLeftPanel(shouldExpand: Bool)
}
