import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "Utils.Saver",
    async beforeRegisterNodeDef(nodeType, nodeData) {
        if (nodeData.name !== "SVGSaver") {
            return;
        }

        // 保存原始的创建函数
        const onNodeCreated = nodeType.prototype.onNodeCreated;

        // 扩展节点创建函数
        nodeType.prototype.onNodeCreated = function () {
            // 调用原始创建函数
            if (onNodeCreated) {
                onNodeCreated.apply(this, arguments);
            }

            // 创建下载按钮widget
            const downloadButton = this.addWidget(
                "button",                     // widget类型
                "download_svg",               // 唯一标识符
                "Download SVG",               // 显示文本
                () => {                       // 点击回调函数
                    const svgString = this.widgets.find(w => w.name === "svg_string")?.value;
                    const filename = this.widgets.find(w => w.name === "filename")?.value || "output.svg";

                    if (!svgString) {
                        alert("No SVG data available. Please input SVG data first.");
                        return;
                    }

                    try {
                        const blob = new Blob([svgString], { type: 'image/svg+xml' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    } catch (error) {
                        console.error("Failed to download SVG:", error);
                        alert("Failed to download SVG. Check console for details.");
                    }
                }
            );

            // 设置按钮不需要序列化
            downloadButton.serialize = false;
        };
    }
});