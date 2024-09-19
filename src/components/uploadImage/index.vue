<template>
    <div class="components-container">
        <!-- 新增菜单 -->
        <el-dialog title="上传图片" :visible.sync="uploadDialog" width="800px" center custom-class="dialog" :close-on-click-modal="false">
            <div class="box">
                <div class="left">
                    <el-button type="success" class="lgm-search-btn" size="small" @click="clickAddMenu">新增目录</el-button>
                    <div class="item" :class="{ 'isActive': activeIndex === index }" v-for="(item, index) of menuList" :key="item.id" @click="clickMenu(index)">
                        {{ item.title }}
                    </div>
                </div>
                <div class="right">
                    <div class="image-wrap">
                        <div class="image" v-for="(item, index) of imageList" :key="item.id" @click="clickSelectImage(index)">
                            <el-image :src="item.img" fit="cover"></el-image>

                            <i class="el-icon-delete delete-icon" v-show="!item.isActive" @click.stop="deleteImage(index)"></i>

                            <div class="mc" v-show="item.isActive"></div>

                        </div>
                    </div>

                </div>
            </div>

            <div class="bottom">
                <div class="left-text">
                    当前已选 {{ selectImageLength }} 个文件
                </div>
                <div class="right-btn">
                    <el-button class="lgm-reset-btn" @click="uploadDialog = false">取消</el-button>
                    <el-button type="primary" @click="selectImage" class="lgm-search-btn submit-btn">确定</el-button>
                </div>
            </div>
        </el-dialog>


        <el-dialog title="新增目录" :visible.sync="menuDialog" width="500px" center custom-class="dialog">
            <div class="menu-form">
                <span>名称</span>
                <el-input v-model="menuName" placeholder="请输入目录名称"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button class="lgm-reset-btn" @click="menuDialog = false">取消</el-button>
                <el-button type="primary" @click="addMenuSubmit" class="lgm-search-btn">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                uploadDialog: false,
                activeIndex: 1000,
                menuList: [{
                        id: '001',
                        title: '全部'
                    },
                    {
                        id: '002',
                        title: '牛仔裤'
                    }
                ],
                imageList: [
                    { img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', id: '001' },
                    { img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', id: '002' },
                    { img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', id: '003' },
                    { img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', id: '004' },
                    { img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', id: '005' },
                ],
                menuDialog: false,
                menuName: '',
                selectImageArr: [], // 已选择的图片
                selectImageLength: 0, // 已选择图片数量
            }
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            single: {
                type: Boolean,
                default: false
            }

        },
        watch: {
            isShow(bool) {
                this.uploadDialog = bool
            }
        },
        created() {
            for (let i in this.imageList) {
                let item = this.imageList[i]
                this.$set(item, 'isActive', false)
            }
        },
        methods: {
            clickSelectImage(index) {
                if (this.single) {
                    for (let i in this.imageList) {
                        let item = this.imageList[i]
                        item.isActive = false
                    }
                    console.log(this.single, 'this.isSingle')
                    this.imageList[index].isActive = true
                    this.selectImageLength = 1

                } else {
                    this.imageList[index].isActive = !this.imageList[index].isActive

                    let selectNum = 0
                    for (let i in this.imageList) {
                        let item = this.imageList[i]
                        if (item.isActive) {
                            selectNum += 1
                        }
                    }

                    this.selectImageLength = selectNum
                }


            },
            clickMenu(index) {
                this.activeIndex = index
            },
            clickAddMenu() {
                this.menuDialog = true
            },
            deleteImage(index) {
                this.$confirm('确定执行该操作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'submitDeleteBtn',
                    type: 'warning'
                }).then(() => {
                    this.imageList.splice(index, 1)
                    
                    if (this.selectImageLength > 0) {
                        this.selectImageLength -= 1
                    }
                    
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            },
            clickAddMenu() {
                this.menuDialog = true
            },
            addMenuSubmit() {
                if (this.menuName !== '') {
                    this.menuList.push({
                        id: '003',
                        title: this.menuName
                    })

                    this.menuName = ''
                    this.menuDialog = false

                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '目录名称不能为空',
                        type: 'error'
                    });
                }
            },
            selectImage() {
                let arr = []
                for (let i in this.imageList) {
                    let item = this.imageList[i]
                    if (item.isActive) {
                        arr.push(item)
                    }
                }
                this.selectImageArr = arr

                this.$emit('selectImageData', this.selectImageArr)

                this.uploadDialog = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .lgm-search-btn {
        margin-left: 0 !important;
    }

    .submit-btn {
        margin-left: 10px !important;
    }

    .menu-form {
        display: flex;
        align-items: center;

        span {
            width: 45px;
        }
    }

    .bottom {
        display: flex;
        align-items: center;

        .left-text {
            width: 50%;
        }

        .right-btn {
            width: 50%;
        }
    }

    .box {
        display: flex;
        justify-content: space-between;

        .left {
            width: 200px;
            height: 500px;
            border: 1px solid #eee;
            padding: 10px;
            overflow-y: auto;

            button {
                width: 100%;
                margin-bottom: 5px;
            }

            .item {
                width: 100%;
                height: 30px;
                border: 1px solid #fff;
                border-radius: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &:hover {
                    border-color: $fontColor;
                }
            }
        }

        .right {
            width: 530px;
            height: 500px;
            border: 1px solid #eee;
            overflow-y: auto;

            .image-wrap {
                display: flex;
                flex-wrap: wrap;
                position: relative;

                .mc {
                    width: 100%;
                    height: 100%;
                    background-color: rgb(58 142 230 / 51%);
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                .image {
                    width: 87px;
                    height: 87px;
                    margin: 0 7px;
                    margin-bottom: 15px;
                    position: relative;
                    border: 1px solid #000;

                    &:hover {
                        .delete-icon {
                            display: block;
                        }
                    }

                    .el-image {
                        width: 100%;
                        height: 100%;
                    }

                    .delete-icon {
                        position: absolute;
                        right: 0;
                        top: 0;
                        font-size: 20px;
                        color: #fff;
                        font-weight: bold;
                        display: none;
                        cursor: pointer;
                    }
                }
            }


        }
    }
</style>