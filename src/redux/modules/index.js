// @flow

import type { Tasks } from '~/src/redux/modules/tasks'
import type { Ui } from '~/src/redux/modules/ui'

export type State = {
  tasks: Tasks,
  ui: Ui
}
