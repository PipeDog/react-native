/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule nativeModulePrefixNormalizer
 * @flow
 */
'use strict';

// Dirty hack to support old (RK) and new (RCT) native module name conventions

// @brief Native 模块前缀修正（规范）器
function nativeModulePrefixNormalizer(
    // {'strippedName': 'moduleName'}
    // @eg: {'AlertManager': 'RCTAlertManager'}
    modules: {
        [key: string]: any
    }
): void {
    Object.keys(modules).forEach((moduleName) => {
        // `strippedName` 干掉 `RCT / RK` 前缀的 moduleName
        var strippedName = moduleName.replace(/^(RCT|RK)/, '');
        if (modules['RCT' + strippedName] && modules['RK' + strippedName]) {
            throw new Error(
                'Module cannot be registered as both RCT and RK: ' + moduleName
            );
        }
        if (strippedName !== moduleName) {
            modules[strippedName] = modules[moduleName];
            delete modules[moduleName];
        }
    });
}

module.exports = nativeModulePrefixNormalizer;