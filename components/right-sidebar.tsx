import { fabric } from "fabric";
import { useRef } from "react";

import { Color } from "@/components/settings/color";
import { Dimensions } from "@/components/settings/dimensions";
import { Export } from "@/components/settings/export";
import { Text } from "@/components/settings/text";
import { modifyShape } from "@/lib/shapes";
import type { RightSidebarProps } from "@/types/type";

export const RightSidebar = ({
  activeObjectRef,
  elementAttributes,
  fabricRef,
  isEditingRef,
  setElementAttributes,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);
  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef?.current) isEditingRef.current = true;

    setElementAttributes((prevAttributes) => ({
      ...prevAttributes,
      [property]: value,
    }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 h-full max-sm:hidden select-none">
      <h3 className="px-5 pt-4 text-xs uppercase">Design</h3>

      <span className="text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4">
        Make changes to canvas as you like
      </span>

      <Dimensions
        isEditingRef={isEditingRef}
        width={elementAttributes.width}
        height={elementAttributes.height}
        handleInputChange={handleInputChange}
      />

      <Text
        fontFamily={elementAttributes.fontFamily}
        fontSize={elementAttributes.fontSize}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={handleInputChange}
      />

      <Color
        inputRef={colorInputRef}
        attribute={elementAttributes.fill}
        placeholder="color"
        handleInputChange={handleInputChange}
        attributeType="fill"
      />
      <Color
        inputRef={strokeInputRef}
        attribute={elementAttributes.stroke}
        placeholder="stroke"
        handleInputChange={handleInputChange}
        attributeType="stroke"
      />

      <Export />
    </section>
  );
};
