import type { FieldDefinition } from "../types";
import { TextField } from "./text";
import { NumberField } from "./number";
import { SelectField } from "./select";
import { ColorField } from "./color";
import { TextareaField } from "./textarea";
import { ColorPickerField, type ColorPickerFieldProps } from "./color-picker";
import { ImageUploadField, type ImageUploadFieldProps } from "./image-upload";
import { BackgroundImageUploadField } from "./background-image-upload";
import { SwitchField } from "./switch";

export const defaultFields: FieldDefinition[] = [
  {
    type: "text",
    label: "Text",
    component: TextField,
  },
  {
    type: "number",
    label: "Number",
    component: NumberField,
  },
  {
    type: "select",
    label: "Select",
    component: SelectField,
  },
  {
    type: "color",
    label: "Color",
    component: ColorField,
  },
  {
    type: "textarea",
    label: "Textarea",
    component: TextareaField,
  },
  {
    type: "color-picker",
    label: "Color Picker",
    component: ColorPickerField,
  },
  {
    type: "image-upload",
    label: "Image Upload",
    component: ImageUploadField,
  },
  {
    type: "background-image-upload",
    label: "Background Image Upload",
    component: BackgroundImageUploadField,
  },
  {
    type: "switch",
    label: "Switch",
    component: SwitchField,
  },
];

export {
  TextField,
  NumberField,
  SelectField,
  ColorField,
  TextareaField,
  ColorPickerField,
  ImageUploadField,
  BackgroundImageUploadField,
  SwitchField,
};

export type { ColorPickerFieldProps, ImageUploadFieldProps };

