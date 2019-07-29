/**
 * @author 赵伦
 * @date 2019-04-23
 * @description 多选JS
 * @example 如下例子
 *
 * // html
 * <div>
 *   //    <!--这里绑定选中状态样式-->                                                     <!--这里点击时会自动选择-->
 *   <div :class="{checked:item.checked}" v-for="item of selectList.list" :key="item.id" @click="selectList.select(item)">
 *      {{item.name}}
 *   </div>
 * </div>
 *
 * // js
 * import MultiSelect from 'utils/multiselect'; // 引入js
 * export default {
 *   data(){
 *      return {
 *          list:[
 *            {id:1,name:"name1",checked:false},
 *            {id:2,name:"name2",checked:false},
 *          ],
 *          selectedIds:[1]
 *      }
 *   },
 *   computed:{ // 在小程序中必须写在 computed 中
 *      selectList(){
 *         return new MultiSelect()
 *                .from(this.list,'id','checked') // 绑定操作列表,其中第二个参数为唯一键名，第二个参数为选择键名，必填
 *                .single() // 开启单选，可选
 *                .setChecked(this.selectedIds) // 默认选中 id 为 1 的，可选
 *                .onChange((items)=>{}) // 这里可以绑定一个选中之后的回调，回调函数的参数为选中的列表，可选
 *      }
 *   }
 * }
 */
/* eslint-disable */
export default class MultiSelect {
    /** 选择列表数据 */
    list = [];
    /** 选中键值 */
    _selectKey = 'checked'
    /** 唯一键值 */
    _idKey = 'id'
    /** 是否多选 */
    _multi = true;
    /** 变化函数，默认空函数 */
    _onchange = () => { }

    /** 设置多选列表 */
    from(list, idKey, selectKey) {
        this.list = list || []
        this._selectKey = selectKey || 'checked'
        this._idKey = idKey || 'id'
        this.clear()
        return this
    }

    /** 设置默认选中ID */
    setChecked(ids) {
        ids = ids || []
        this.list.map(item => {
            if (ids.includes(item[this._idKey])) {
                item[this._selectKey] = true
            } else {
                item[this._selectKey] = false
            }
        })
        return this
    }

    /** 开启单选模式 */
    single() {
        this._multi = false
        return this
    }

    /** 清空所有选中 */
    clear() {
        this.list.map(item => item[this._selectKey] = false)
        return this
    }

    selectByEvent( {
        currentTarget: {
            dataset: { index }
        }
    }) {
        this.select(this.list[index]);
    }

    /** 选中 */
    select(item) {
        if (!this._multi) {
            this.clear()
        }
        if (this.list.some(data => data == item)) {
            item[this._selectKey] = !item[this._selectKey]
        }
        this._onchange(this.getSelected())
        return this
    }

    /** 检查是否选中 */
    check(item, className) {
        let checked = !!item[this._selectKey]
        if (className) {
            return checked ? className : ''
        } else return checked
    }

    /** 有变化的时候 */
    onChange(fn) {
        this._onchange = fn || (() => { })
        return this
    }

    /** 获取所有选中的列表 */
    getSelected() {
        let selected = this.list.filter(item => item[this._selectKey])
        return selected
    }
}
