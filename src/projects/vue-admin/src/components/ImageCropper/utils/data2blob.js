/**
 * database64文件格式转换为2进制
 *
 * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
export default function (data, mime) {
  let content = data.split(',')[1];
  content = window.atob(content);
  const ia = new Uint8Array(content.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < content.length; i++) {
    ia[i] = content.charCodeAt(i);
  }
  // canvas.toDataURL 返回的默认格式就是 image/png
  return new Blob([ia], {
    type: mime
  });
}
