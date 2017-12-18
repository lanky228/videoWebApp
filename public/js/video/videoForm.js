/**
 * Created by liuzhengri on 17-9-3.
 */
Vue.component('my-video-form', {
    template: `
<div>
    <el-dialog :visible.sync="visible">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">确定</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
    `,
    data: function () {
        return {
            visible: false,
            form: {
                name: ''
            }
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        onShow() {
            Vue.set(this, 'visible', true);
        },
        onCancel() {
            Vue.set(this, 'visible', false);
        }
    }
});