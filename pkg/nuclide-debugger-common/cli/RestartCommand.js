/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {Command} from './Command';

import {DebuggerInterface} from './DebuggerInterface';

export default class RestartCommand implements Command {
  name = 'restart';
  helpText = 'Restart the current target.';

  _debugger: DebuggerInterface;

  constructor(debug: DebuggerInterface) {
    this._debugger = debug;
  }

  async execute(): Promise<void> {
    return this._debugger.relaunch();
  }
}
