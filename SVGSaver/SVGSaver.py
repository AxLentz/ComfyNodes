# remote_svg.py
class SVGSaver:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "svg_string": ("STRING", {"multiline": True}),
                "filename": ("STRING", {"default": "output.svg"})
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "saveSVG"
    OUTPUT_NODE = True
    CATEGORY = "utils"

    def saveSVG(self, svg_string, filename):
        # 直接返回输入的SVG字符串
        return (svg_string,)

NODE_CLASS_MAPPINGS = {
    "SVGSaver": SVGSaver
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "SVGSaver": "MySvgSaver"
}