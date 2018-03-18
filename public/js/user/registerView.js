/**
 * Created by liuzhengri on 17-9-3.
 */
Vue.component('my-register-view', {
    template: `
<div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="onSubmit">注册</el-button>
        </el-form-item>
    </el-form>
</div>
    `,
    data: function () {
        return {
            form: {
                name: '',
                password: ''
            }
        };
    },
    methods: {
        onSubmit() {
            var searchParams = new URLSearchParams()
            searchParams.set('name', this.form.name);
            searchParams.set('password', this.form.password);
            fetch('/user/register', {
                method: 'POST',
                body: searchParams
            }).then(function (response) {
                window.location.href = "/public/page/loginView.html";
            }).catch(function (err) {
                console.log('Fetch错误:' + err);
            });
        }
    }
});