/**
 * Created by liuzhengri on 17-9-3.
 */
Vue.component('my-video-view', {
    template: `
<div>
    <el-button-group>
      <el-button icon="plus" @click="addVideoFile"></el-button>
      <el-button icon="delete"></el-button>
    </el-button-group>
    <el-table :data="videoFile">
        <el-table-column prop="fileId" label="ID"></el-table-column>
        <el-table-column prop="fileName" label="名称"></el-table-column>
        <el-table-column prop="createrName" label="创建人"></el-table-column>
        <el-table-column prop="creationDate" label="创建时间"></el-table-column>
    </el-table>
</div>
    `,
    data: function () {
        return {
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
        addVideoFile :function(){
            console.log('addVideoFile');
        }
    }
});