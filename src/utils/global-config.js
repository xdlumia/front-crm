import api from './api'
import local from './localStorage'
import router from './router'
import utils from './utils'
import commonMixin from './commonMixin'
import dictionary from './dictionary'

import {
	$toast,
	$message
} from './message'

export default {
	install: function (vm) {
		vm.mixin(dictionary)
		vm.mixin(commonMixin)
		vm.prototype.$local = local
		vm.prototype.$api = api
		vm.prototype.$routing = router
		vm.prototype.$toast = $toast
		vm.prototype.$message = $message
		vm.prototype.$utils = utils
	}
}
