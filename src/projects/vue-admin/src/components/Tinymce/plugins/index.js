// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
/* eslint-disable */

((tinymce) => {
  tinymce.PluginManager.add('lineheight', (editor, url, $) => {
    editor.on('init', () => {
      editor.formatter.register({
        lineheight: { inline: 'span', styles: { 'line-height': '%value' } }
      });
    });

    editor.addButton('lineheightselect', () => {
      const items = [];
      const defaultLineHeightFormats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt';
      const lineheight_formats = editor.settings.lineheight_formats || defaultLineHeightFormats;
      lineheight_formats.split(' ').forEach((item) => {
        let text = item; let
          value = item;
        // Allow text=value for line-height formats
        const values = item.split('=');
        if (values.length > 1) {
          [text, value] = values;
        //   value = values[1]
        }
        items.push({ text, value });
      });
      return {
        type: 'listbox',
        text: 'Line Height',
        tooltip: 'Line Height',
        values: items,
        fixedWidth: true,
        onPostRender() {
          const self = this;
          editor.on('nodeChange', (e) => {
            const formatName = 'lineheight';
            const { formatter } = editor;
            let value = null;
            e.parents.forEach((node) => {
              items.forEach((item) => {
                if (formatName) {
                  if (formatter.matchNode(node, formatName, { value: item.value })) {
                    // eslint-disable-next-line prefer-destructuring
                    value = item.value;
                  }
                } else if (formatter.matchNode(node, item.value)) {
                  // eslint-disable-next-line prefer-destructuring
                  value = item.value;
                }
                if (value) {
                  return false;
                }
              });
              if (value) {
                return false;
              }
            });
            self.value(value);
          });
        },
        onselect(e) {
          tinymce.activeEditor.formatter.apply('lineheight', { value: this.value() });
        }
      };
    });
  });
  tinymce.PluginManager.requireLangPack('lineheight', 'de');
})(window.tinymce);
// eslint-disable-next-line
const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount lineheight']

export default plugins;
