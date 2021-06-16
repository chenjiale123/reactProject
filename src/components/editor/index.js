import React from 'react';
 import { Editor } from '@tinymce/tinymce-react';

 class TinyEditor extends React.Component {
     state={
        editorState:'111'
     }
   handleEditorChange = (content, editor) => {
     console.log('Content was updated:', content);
   }

   render() {
       //上传图片
       let images_upload_handler = async (blob, success, fail) => {
        let param = new FormData();
        param.append("img", blob.blob());
        // let data = await update_img(param);//update_img是自己定义的上传图片视频方法,需要自行封装，很简单
        // success(data.url);
    }
    //上传视频
    let file_picker_callback = async (cb, value, meta) => {
        //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
        if (meta.filetype == 'media') {
            //创建一个隐藏的type=file的文件选择input
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.onchange = async function () {
                let file = this.files[0];
                var formData;
                formData = new FormData();
                //假设接口接收参数为file,值为选中的文件
                formData.append('img', file);
                //正式使用将下面被注释的内容恢复
                // let data = await update_img(formData); //update_img是自己定义的上传图片视频方法,需要自行封装，很简单
                // console.log(data);
                // cb(data.url)
            }
            //触发点击
            input.click();
        }
    }
   const editorObj={
      height: '800px',
      language: 'zh_CN',
    //   language_url : '翻译中文的路径，我尝试很多种方法都不成功，最后叫后台的老哥放进项目的服务器上了，用的线上地址',
      plugins: 'table lists link image preview code',
      toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor |   link image | alignleft aligncenter alignright alignjustify  | 
      numlist bullist outdent indent`,
      relative_urls: false,
      file_picker_types: 'image',
    //   images_upload_url: {'上传图片的路径'},
      image_advtab: true,
      image_uploadtab: true,
      images_upload_handler:(blobInfo, success, failure)=>{
      		//这里写你上传图片的方法
              console.log('222')
      }
   	}
     return (
       <Editor
         inline={false}
         selector='editorStateRef'  // 选择器
   		 apiKey='nqivn5uf2wzy8a0ivsjkm83rutzk6x3rp80xm8i9r9p2k1l3'
         initialValue={this.state.editorState}
         init={{...editorObj}}
     	 onEditorChange={this.handleEditorChange}
       />
     );
   }
 }

 export default TinyEditor;
