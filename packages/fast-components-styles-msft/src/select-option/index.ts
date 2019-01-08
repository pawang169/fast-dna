import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager";
import { applyTypeRampConfig } from "../utilities/typography";
import { SelectOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import {
    adjustContrast,
    applyLocalizedProperty,
    contrast,
    Direction,
    ensureContrast,
    focusVisible,
    localizeSpacing,
    scaleContrast,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { curry, get } from "lodash-es";
import designSystemDefaults, {
    DesignSystem,
    withDesignSystemDefaults,
} from "../design-system";
import {
    applyMixedColor,
    disabledContrast,
    ensureForegroundNormal,
    ensureLargeContrast,
    ensureNormalContrast,
    hoverContrast,
    largeContrast,
    normalContrast,
    scaleContrastNormal,
} from "../utilities/colors";
import Chroma from "chroma-js";
import { density } from "../utilities/density";
import { defaultHeight, maxHeight, minHeight } from "../utilities/height";
import outlinePattern from "../patterns/outline";

const styles: ComponentStyles<SelectOptionClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<SelectOptionClassNameContract, DesignSystem> => {
    return {
        selectOption: {},
        selectOption__disabled: {},
    };
};

export default styles;
