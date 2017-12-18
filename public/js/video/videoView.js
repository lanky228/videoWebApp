/**
 * Created by liuzhengri on 17-9-3.
 */
Vue.component('my-video-view', {
    template: `
<div>
    <el-button-group>
      <el-button type="primary" icon="el-icon-edit" @click="showPanel"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>
    <el-table :data="videoFile">
        <el-table-column prop="fileId" label="ID"></el-table-column>
        <el-table-column prop="fileName" label="名称"></el-table-column>
        <el-table-column prop="createrName" label="创建人"></el-table-column>
        <el-table-column prop="creationDate" label="创建时间"></el-table-column>
    </el-table>
    <my-video-form ref="form"></my-video-form>
</div>
    `,
    data: function () {
        return {
            visible: true,
            videoFile: [{
                fileId: '1',
                fileName: 'fileName1',
                createrName: 'createrName1',
                creationDate: 'creationDate1'
            }, {
                fileId: '2',
                fileName: 'fileName2',
                createrName: 'createrName2',
                creationDate: 'creationDate2'
            }]
        };
    },
    methods: {
        showPanel: function(){
            this.$refs.form.onShow(); 
        }
    }
});