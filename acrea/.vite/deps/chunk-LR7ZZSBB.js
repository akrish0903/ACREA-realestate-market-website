import {
  _extends,
  init_extends,
  require_prop_types,
  require_react_is
} from "./chunk-ILGFBWUT.js";
import {
  require_hoist_non_react_statics_cjs
} from "./chunk-MFUCCS4W.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-Q27KEZHG.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS,
  __esm,
  __export,
  __publicField,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/utils/esm/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes = void 0) {
  const output = {};
  for (const slotName in slots) {
    const slot = slots[slotName];
    let buffer = "";
    let start = true;
    for (let i = 0; i < slot.length; i += 1) {
      const value = slot[i];
      if (value) {
        buffer += (start === true ? "" : " ") + getUtilityClass(value);
        start = false;
        if (classes && classes[value]) {
          buffer += " " + classes[value];
        }
      }
    }
    output[slotName] = buffer;
  }
  return output;
}
var init_composeClasses = __esm({
  "node_modules/@mui/utils/esm/composeClasses/composeClasses.js"() {
  }
});

// node_modules/@mui/utils/esm/composeClasses/index.js
var init_composeClasses2 = __esm({
  "node_modules/@mui/utils/esm/composeClasses/index.js"() {
    init_composeClasses();
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
var defaultGenerator, createClassNameGenerator, ClassNameGenerator, ClassNameGenerator_default;
var init_ClassNameGenerator = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js"() {
    defaultGenerator = (componentName) => componentName;
    createClassNameGenerator = () => {
      let generate = defaultGenerator;
      return {
        configure(generator) {
          generate = generator;
        },
        generate(componentName) {
          return generate(componentName);
        },
        reset() {
          generate = defaultGenerator;
        }
      };
    };
    ClassNameGenerator = createClassNameGenerator();
    ClassNameGenerator_default = ClassNameGenerator;
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/index.js
var init_ClassNameGenerator2 = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/index.js"() {
    init_ClassNameGenerator();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}
var globalStateClasses;
var init_generateUtilityClass = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"() {
    init_ClassNameGenerator2();
    globalStateClasses = {
      active: "active",
      checked: "checked",
      completed: "completed",
      disabled: "disabled",
      error: "error",
      expanded: "expanded",
      focused: "focused",
      focusVisible: "focusVisible",
      open: "open",
      readOnly: "readOnly",
      required: "required",
      selected: "selected"
    };
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/index.js
var init_generateUtilityClass2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/index.js"() {
    init_generateUtilityClass();
    init_generateUtilityClass();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}
var init_generateUtilityClasses = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"() {
    init_generateUtilityClass2();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/index.js
var init_generateUtilityClasses2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/index.js"() {
    init_generateUtilityClasses();
  }
});

// node_modules/@mui/utils/esm/chainPropTypes/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  if (false) {
    return () => null;
  }
  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}
var init_chainPropTypes = __esm({
  "node_modules/@mui/utils/esm/chainPropTypes/chainPropTypes.js"() {
  }
});

// node_modules/@mui/utils/esm/chainPropTypes/index.js
var init_chainPropTypes2 = __esm({
  "node_modules/@mui/utils/esm/chainPropTypes/index.js"() {
    init_chainPropTypes();
  }
});

// node_modules/@mui/utils/esm/deepmerge/deepmerge.js
function isPlainObject(item) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(item);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
  if (!isPlainObject(source)) {
    return source;
  }
  const output = {};
  Object.keys(source).forEach((key) => {
    output[key] = deepClone(source[key]);
  });
  return output;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? {
    ...target
  } : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isPlainObject(source[key]) && // Avoid prototype pollution
      Object.prototype.hasOwnProperty.call(target, key) && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
var init_deepmerge = __esm({
  "node_modules/@mui/utils/esm/deepmerge/deepmerge.js"() {
  }
});

// node_modules/@mui/utils/esm/deepmerge/index.js
var init_deepmerge2 = __esm({
  "node_modules/@mui/utils/esm/deepmerge/index.js"() {
    init_deepmerge();
    init_deepmerge();
  }
});

// node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;
  if (element == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  const elementType = element.type;
  if (typeof elementType === "function" && !isClassComponent(elementType)) {
    warningHint = "Did you accidentally use a plain function component for an element instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var import_prop_types, elementAcceptingRef, elementAcceptingRef_default;
var init_elementAcceptingRef = __esm({
  "node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js"() {
    import_prop_types = __toESM(require_prop_types());
    init_chainPropTypes2();
    elementAcceptingRef = chainPropTypes(import_prop_types.default.element, acceptingRef);
    elementAcceptingRef.isRequired = chainPropTypes(import_prop_types.default.element.isRequired, acceptingRef);
    elementAcceptingRef_default = elementAcceptingRef;
  }
});

// node_modules/@mui/utils/esm/elementAcceptingRef/index.js
var init_elementAcceptingRef2 = __esm({
  "node_modules/@mui/utils/esm/elementAcceptingRef/index.js"() {
    init_elementAcceptingRef();
  }
});

// node_modules/@mui/utils/esm/elementTypeAcceptingRef/elementTypeAcceptingRef.js
function isClassComponent2(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  if (typeof propValue === "function" && !isClassComponent2(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var import_prop_types2, elementTypeAcceptingRef_default;
var init_elementTypeAcceptingRef = __esm({
  "node_modules/@mui/utils/esm/elementTypeAcceptingRef/elementTypeAcceptingRef.js"() {
    import_prop_types2 = __toESM(require_prop_types());
    init_chainPropTypes2();
    elementTypeAcceptingRef_default = chainPropTypes(import_prop_types2.default.elementType, elementTypeAcceptingRef);
  }
});

// node_modules/@mui/utils/esm/elementTypeAcceptingRef/index.js
var init_elementTypeAcceptingRef2 = __esm({
  "node_modules/@mui/utils/esm/elementTypeAcceptingRef/index.js"() {
    init_elementTypeAcceptingRef();
  }
});

// node_modules/@mui/utils/esm/exactProp/exactProp.js
function exactProp(propTypes) {
  if (false) {
    return propTypes;
  }
  return {
    ...propTypes,
    [specialProperty]: (props) => {
      const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(`The following props are not supported: ${unsupportedProps.map((prop) => `\`${prop}\``).join(", ")}. Please remove them.`);
      }
      return null;
    }
  };
}
var specialProperty;
var init_exactProp = __esm({
  "node_modules/@mui/utils/esm/exactProp/exactProp.js"() {
    specialProperty = "exact-prop: ​";
  }
});

// node_modules/@mui/utils/esm/exactProp/index.js
var init_exactProp2 = __esm({
  "node_modules/@mui/utils/esm/exactProp/index.js"() {
    init_exactProp();
  }
});

// node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js
var init_formatMuiErrorMessage = __esm({
  "node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js"() {
  }
});

// node_modules/@mui/utils/esm/formatMuiErrorMessage/index.js
var init_formatMuiErrorMessage2 = __esm({
  "node_modules/@mui/utils/esm/formatMuiErrorMessage/index.js"() {
    init_formatMuiErrorMessage();
  }
});

// node_modules/@mui/utils/esm/getDisplayName/getDisplayName.js
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case import_react_is.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case import_react_is.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
var import_react_is;
var init_getDisplayName = __esm({
  "node_modules/@mui/utils/esm/getDisplayName/getDisplayName.js"() {
    import_react_is = __toESM(require_react_is());
  }
});

// node_modules/@mui/utils/esm/getDisplayName/index.js
var init_getDisplayName2 = __esm({
  "node_modules/@mui/utils/esm/getDisplayName/index.js"() {
    init_getDisplayName();
  }
});

// node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js
function HTMLElementType(props, propName, componentName, location, propFullName) {
  if (false) {
    return null;
  }
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null) {
    return null;
  }
  if (propValue && propValue.nodeType !== 1) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an HTMLElement.`);
  }
  return null;
}
var init_HTMLElementType = __esm({
  "node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js"() {
  }
});

// node_modules/@mui/utils/esm/HTMLElementType/index.js
var init_HTMLElementType2 = __esm({
  "node_modules/@mui/utils/esm/HTMLElementType/index.js"() {
    init_HTMLElementType();
  }
});

// node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js
var ponyfillGlobal_default;
var init_ponyfillGlobal = __esm({
  "node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js"() {
    ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  }
});

// node_modules/@mui/utils/esm/ponyfillGlobal/index.js
var init_ponyfillGlobal2 = __esm({
  "node_modules/@mui/utils/esm/ponyfillGlobal/index.js"() {
    init_ponyfillGlobal();
  }
});

// node_modules/@mui/utils/esm/refType/refType.js
var import_prop_types3, refType, refType_default;
var init_refType = __esm({
  "node_modules/@mui/utils/esm/refType/refType.js"() {
    import_prop_types3 = __toESM(require_prop_types());
    refType = import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object]);
    refType_default = refType;
  }
});

// node_modules/@mui/utils/esm/refType/index.js
var init_refType2 = __esm({
  "node_modules/@mui/utils/esm/refType/index.js"() {
    init_refType();
  }
});

// node_modules/@mui/utils/esm/capitalize/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(true ? `MUI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var init_capitalize = __esm({
  "node_modules/@mui/utils/esm/capitalize/capitalize.js"() {
    init_formatMuiErrorMessage2();
  }
});

// node_modules/@mui/utils/esm/capitalize/index.js
var init_capitalize2 = __esm({
  "node_modules/@mui/utils/esm/capitalize/index.js"() {
    init_capitalize();
  }
});

// node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
var init_createChainedFunction = __esm({
  "node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js"() {
  }
});

// node_modules/@mui/utils/esm/createChainedFunction/index.js
var init_createChainedFunction2 = __esm({
  "node_modules/@mui/utils/esm/createChainedFunction/index.js"() {
    init_createChainedFunction();
  }
});

// node_modules/@mui/utils/esm/debounce/debounce.js
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
var init_debounce = __esm({
  "node_modules/@mui/utils/esm/debounce/debounce.js"() {
  }
});

// node_modules/@mui/utils/esm/debounce/index.js
var init_debounce2 = __esm({
  "node_modules/@mui/utils/esm/debounce/index.js"() {
    init_debounce();
    init_debounce();
  }
});

// node_modules/@mui/utils/esm/deprecatedPropType/deprecatedPropType.js
function deprecatedPropType(validator2, reason) {
  if (false) {
    return () => null;
  }
  return (props, propName, componentName, location, propFullName) => {
    const componentNameSafe = componentName || "<<anonymous>>";
    const propFullNameSafe = propFullName || propName;
    if (typeof props[propName] !== "undefined") {
      return new Error(`The ${location} \`${propFullNameSafe}\` of \`${componentNameSafe}\` is deprecated. ${reason}`);
    }
    return null;
  };
}
var init_deprecatedPropType = __esm({
  "node_modules/@mui/utils/esm/deprecatedPropType/deprecatedPropType.js"() {
  }
});

// node_modules/@mui/utils/esm/deprecatedPropType/index.js
var init_deprecatedPropType2 = __esm({
  "node_modules/@mui/utils/esm/deprecatedPropType/index.js"() {
    init_deprecatedPropType();
  }
});

// node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js
function isMuiElement(element, muiNames) {
  var _a, _b, _c;
  return React.isValidElement(element) && muiNames.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    element.type.muiName ?? ((_c = (_b = (_a = element.type) == null ? void 0 : _a._payload) == null ? void 0 : _b.value) == null ? void 0 : _c.muiName)
  ) !== -1;
}
var React;
var init_isMuiElement = __esm({
  "node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js"() {
    React = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/isMuiElement/index.js
var init_isMuiElement2 = __esm({
  "node_modules/@mui/utils/esm/isMuiElement/index.js"() {
    init_isMuiElement();
  }
});

// node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node2) {
  return node2 && node2.ownerDocument || document;
}
var init_ownerDocument = __esm({
  "node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js"() {
  }
});

// node_modules/@mui/utils/esm/ownerDocument/index.js
var init_ownerDocument2 = __esm({
  "node_modules/@mui/utils/esm/ownerDocument/index.js"() {
    init_ownerDocument();
  }
});

// node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node2) {
  const doc = ownerDocument(node2);
  return doc.defaultView || window;
}
var init_ownerWindow = __esm({
  "node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js"() {
    init_ownerDocument2();
  }
});

// node_modules/@mui/utils/esm/ownerWindow/index.js
var init_ownerWindow2 = __esm({
  "node_modules/@mui/utils/esm/ownerWindow/index.js"() {
    init_ownerWindow();
  }
});

// node_modules/@mui/utils/esm/requirePropFactory/requirePropFactory.js
function requirePropFactory(componentNameInError, Component) {
  if (false) {
    return () => null;
  }
  const prevPropTypes = Component ? {
    ...Component.propTypes
  } : null;
  const requireProp = (requiredProp) => (props, propName, componentName, location, propFullName, ...args) => {
    const propFullNameSafe = propFullName || propName;
    const defaultTypeChecker = prevPropTypes == null ? void 0 : prevPropTypes[propFullNameSafe];
    if (defaultTypeChecker) {
      const typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);
      if (typeCheckerResult) {
        return typeCheckerResult;
      }
    }
    if (typeof props[propName] !== "undefined" && !props[requiredProp]) {
      return new Error(`The prop \`${propFullNameSafe}\` of \`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`);
    }
    return null;
  };
  return requireProp;
}
var init_requirePropFactory = __esm({
  "node_modules/@mui/utils/esm/requirePropFactory/requirePropFactory.js"() {
  }
});

// node_modules/@mui/utils/esm/requirePropFactory/index.js
var init_requirePropFactory2 = __esm({
  "node_modules/@mui/utils/esm/requirePropFactory/index.js"() {
    init_requirePropFactory();
  }
});

// node_modules/@mui/utils/esm/setRef/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
var init_setRef = __esm({
  "node_modules/@mui/utils/esm/setRef/setRef.js"() {
  }
});

// node_modules/@mui/utils/esm/setRef/index.js
var init_setRef2 = __esm({
  "node_modules/@mui/utils/esm/setRef/index.js"() {
    init_setRef();
  }
});

// node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
var React2, useEnhancedEffect, useEnhancedEffect_default;
var init_useEnhancedEffect = __esm({
  "node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js"() {
    "use client";
    React2 = __toESM(require_react());
    useEnhancedEffect = typeof window !== "undefined" ? React2.useLayoutEffect : React2.useEffect;
    useEnhancedEffect_default = useEnhancedEffect;
  }
});

// node_modules/@mui/utils/esm/useEnhancedEffect/index.js
var init_useEnhancedEffect2 = __esm({
  "node_modules/@mui/utils/esm/useEnhancedEffect/index.js"() {
    init_useEnhancedEffect();
  }
});

// node_modules/@mui/utils/esm/useId/useId.js
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = React3.useState(idOverride);
  const id = idOverride || defaultId;
  React3.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
function useId(idOverride) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride ?? reactId;
  }
  return useGlobalId(idOverride);
}
var React3, globalId, safeReact, maybeReactUseId;
var init_useId = __esm({
  "node_modules/@mui/utils/esm/useId/useId.js"() {
    "use client";
    React3 = __toESM(require_react());
    globalId = 0;
    safeReact = {
      ...React3
    };
    maybeReactUseId = safeReact.useId;
  }
});

// node_modules/@mui/utils/esm/useId/index.js
var init_useId2 = __esm({
  "node_modules/@mui/utils/esm/useId/index.js"() {
    init_useId();
  }
});

// node_modules/@mui/utils/esm/unsupportedProp/unsupportedProp.js
function unsupportedProp(props, propName, componentName, location, propFullName) {
  if (false) {
    return null;
  }
  const propFullNameSafe = propFullName || propName;
  if (typeof props[propName] !== "undefined") {
    return new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
  }
  return null;
}
var init_unsupportedProp = __esm({
  "node_modules/@mui/utils/esm/unsupportedProp/unsupportedProp.js"() {
  }
});

// node_modules/@mui/utils/esm/unsupportedProp/index.js
var init_unsupportedProp2 = __esm({
  "node_modules/@mui/utils/esm/unsupportedProp/index.js"() {
    init_unsupportedProp();
  }
});

// node_modules/@mui/utils/esm/useControlled/useControlled.js
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React4.useRef(controlled !== void 0);
  const [valueState, setValue] = React4.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    React4.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React4.useRef(defaultProp);
    React4.useEffect(() => {
      if (!isControlled && !Object.is(defaultValue, defaultProp)) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React4.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
var React4;
var init_useControlled = __esm({
  "node_modules/@mui/utils/esm/useControlled/useControlled.js"() {
    "use client";
    React4 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/useControlled/index.js
var init_useControlled2 = __esm({
  "node_modules/@mui/utils/esm/useControlled/index.js"() {
    init_useControlled();
  }
});

// node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
function useEventCallback(fn) {
  const ref = React5.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React5.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var React5, useEventCallback_default;
var init_useEventCallback = __esm({
  "node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js"() {
    "use client";
    React5 = __toESM(require_react());
    init_useEnhancedEffect2();
    useEventCallback_default = useEventCallback;
  }
});

// node_modules/@mui/utils/esm/useEventCallback/index.js
var init_useEventCallback2 = __esm({
  "node_modules/@mui/utils/esm/useEventCallback/index.js"() {
    init_useEventCallback();
  }
});

// node_modules/@mui/utils/esm/useForkRef/useForkRef.js
function useForkRef(...refs) {
  return React6.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, refs);
}
var React6;
var init_useForkRef = __esm({
  "node_modules/@mui/utils/esm/useForkRef/useForkRef.js"() {
    "use client";
    React6 = __toESM(require_react());
    init_setRef2();
  }
});

// node_modules/@mui/utils/esm/useForkRef/index.js
var init_useForkRef2 = __esm({
  "node_modules/@mui/utils/esm/useForkRef/index.js"() {
    init_useForkRef();
  }
});

// node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
function useLazyRef(init, initArg) {
  const ref = React7.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}
var React7, UNINITIALIZED;
var init_useLazyRef = __esm({
  "node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js"() {
    "use client";
    React7 = __toESM(require_react());
    UNINITIALIZED = {};
  }
});

// node_modules/@mui/utils/esm/useLazyRef/index.js
var init_useLazyRef2 = __esm({
  "node_modules/@mui/utils/esm/useLazyRef/index.js"() {
    init_useLazyRef();
  }
});

// node_modules/@mui/utils/esm/useOnMount/useOnMount.js
function useOnMount(fn) {
  React8.useEffect(fn, EMPTY);
}
var React8, EMPTY;
var init_useOnMount = __esm({
  "node_modules/@mui/utils/esm/useOnMount/useOnMount.js"() {
    "use client";
    React8 = __toESM(require_react());
    EMPTY = [];
  }
});

// node_modules/@mui/utils/esm/useTimeout/useTimeout.js
function useTimeout() {
  const timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}
var Timeout;
var init_useTimeout = __esm({
  "node_modules/@mui/utils/esm/useTimeout/useTimeout.js"() {
    "use client";
    init_useLazyRef();
    init_useOnMount();
    Timeout = class _Timeout {
      constructor() {
        __publicField(this, "currentId", null);
        __publicField(this, "clear", () => {
          if (this.currentId !== null) {
            clearTimeout(this.currentId);
            this.currentId = null;
          }
        });
        __publicField(this, "disposeEffect", () => {
          return this.clear;
        });
      }
      static create() {
        return new _Timeout();
      }
      /**
       * Executes `fn` after `delay`, clearing any previously scheduled call.
       */
      start(delay, fn) {
        this.clear();
        this.currentId = setTimeout(() => {
          this.currentId = null;
          fn();
        }, delay);
      }
    };
  }
});

// node_modules/@mui/utils/esm/useTimeout/index.js
var init_useTimeout2 = __esm({
  "node_modules/@mui/utils/esm/useTimeout/index.js"() {
    init_useTimeout();
    init_useTimeout();
  }
});

// node_modules/@mui/utils/esm/useOnMount/index.js
var init_useOnMount2 = __esm({
  "node_modules/@mui/utils/esm/useOnMount/index.js"() {
    init_useOnMount();
  }
});

// node_modules/@mui/utils/esm/isFocusVisible/isFocusVisible.js
function isFocusVisible(element) {
  try {
    return element.matches(":focus-visible");
  } catch (error) {
    if (!/jsdom/.test(window.navigator.userAgent)) {
      console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join("\n"));
    }
  }
  return false;
}
var init_isFocusVisible = __esm({
  "node_modules/@mui/utils/esm/isFocusVisible/isFocusVisible.js"() {
  }
});

// node_modules/@mui/utils/esm/isFocusVisible/index.js
var init_isFocusVisible2 = __esm({
  "node_modules/@mui/utils/esm/isFocusVisible/index.js"() {
    init_isFocusVisible();
  }
});

// node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js
function getScrollbarSize(win = window) {
  const documentWidth = win.document.documentElement.clientWidth;
  return win.innerWidth - documentWidth;
}
var init_getScrollbarSize = __esm({
  "node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js"() {
  }
});

// node_modules/@mui/utils/esm/getScrollbarSize/index.js
var init_getScrollbarSize2 = __esm({
  "node_modules/@mui/utils/esm/getScrollbarSize/index.js"() {
    init_getScrollbarSize();
  }
});

// node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js
var React9, usePreviousProps, usePreviousProps_default;
var init_usePreviousProps = __esm({
  "node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js"() {
    "use client";
    React9 = __toESM(require_react());
    usePreviousProps = (value) => {
      const ref = React9.useRef({});
      React9.useEffect(() => {
        ref.current = value;
      });
      return ref.current;
    };
    usePreviousProps_default = usePreviousProps;
  }
});

// node_modules/@mui/utils/esm/usePreviousProps/index.js
var init_usePreviousProps2 = __esm({
  "node_modules/@mui/utils/esm/usePreviousProps/index.js"() {
    init_usePreviousProps();
  }
});

// node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js
function getValidReactChildren(children) {
  return React10.Children.toArray(children).filter((child) => React10.isValidElement(child));
}
var React10;
var init_getValidReactChildren = __esm({
  "node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js"() {
    React10 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/getValidReactChildren/index.js
var init_getValidReactChildren2 = __esm({
  "node_modules/@mui/utils/esm/getValidReactChildren/index.js"() {
    init_getValidReactChildren();
  }
});

// node_modules/@mui/utils/esm/visuallyHidden/visuallyHidden.js
var visuallyHidden, visuallyHidden_default;
var init_visuallyHidden = __esm({
  "node_modules/@mui/utils/esm/visuallyHidden/visuallyHidden.js"() {
    visuallyHidden = {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px"
    };
    visuallyHidden_default = visuallyHidden;
  }
});

// node_modules/@mui/utils/esm/visuallyHidden/index.js
var init_visuallyHidden2 = __esm({
  "node_modules/@mui/utils/esm/visuallyHidden/index.js"() {
    init_visuallyHidden();
  }
});

// node_modules/@mui/utils/esm/integerPropType/integerPropType.js
function getTypeByValue(value) {
  const valueType = typeof value;
  switch (valueType) {
    case "number":
      if (Number.isNaN(value)) {
        return "NaN";
      }
      if (!Number.isFinite(value)) {
        return "Infinity";
      }
      if (value !== Math.floor(value)) {
        return "float";
      }
      return "number";
    case "object":
      if (value === null) {
        return "null";
      }
      return value.constructor.name;
    default:
      return valueType;
  }
}
function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];
  if (propValue == null || !Number.isInteger(propValue)) {
    const propType = getTypeByValue(propValue);
    return new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
  }
  return null;
}
function validator(props, propName, ...other) {
  const propValue = props[propName];
  if (propValue === void 0) {
    return null;
  }
  return requiredInteger(props, propName, ...other);
}
function validatorNoop() {
  return null;
}
var integerPropType_default;
var init_integerPropType = __esm({
  "node_modules/@mui/utils/esm/integerPropType/integerPropType.js"() {
    validator.isRequired = requiredInteger;
    validatorNoop.isRequired = validatorNoop;
    integerPropType_default = false ? validatorNoop : validator;
  }
});

// node_modules/@mui/utils/esm/integerPropType/index.js
var init_integerPropType2 = __esm({
  "node_modules/@mui/utils/esm/integerPropType/index.js"() {
    init_integerPropType();
    init_integerPropType();
  }
});

// node_modules/@mui/utils/esm/resolveProps/resolveProps.js
function resolveProps(defaultProps, props) {
  const output = {
    ...props
  };
  for (const key in defaultProps) {
    if (Object.prototype.hasOwnProperty.call(defaultProps, key)) {
      const propName = key;
      if (propName === "components" || propName === "slots") {
        output[propName] = {
          ...defaultProps[propName],
          ...output[propName]
        };
      } else if (propName === "componentsProps" || propName === "slotProps") {
        const defaultSlotProps = defaultProps[propName];
        const slotProps = props[propName];
        if (!slotProps) {
          output[propName] = defaultSlotProps || {};
        } else if (!defaultSlotProps) {
          output[propName] = slotProps;
        } else {
          output[propName] = {
            ...slotProps
          };
          for (const slotKey in defaultSlotProps) {
            if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
              const slotPropName = slotKey;
              output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
            }
          }
        }
      } else if (output[propName] === void 0) {
        output[propName] = defaultProps[propName];
      }
    }
  }
  return output;
}
var init_resolveProps = __esm({
  "node_modules/@mui/utils/esm/resolveProps/resolveProps.js"() {
  }
});

// node_modules/@mui/utils/esm/resolveProps/index.js
var init_resolveProps2 = __esm({
  "node_modules/@mui/utils/esm/resolveProps/index.js"() {
    init_resolveProps();
  }
});

// node_modules/@mui/utils/esm/clamp/clamp.js
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max));
}
var clamp_default;
var init_clamp = __esm({
  "node_modules/@mui/utils/esm/clamp/clamp.js"() {
    clamp_default = clamp;
  }
});

// node_modules/@mui/utils/esm/clamp/index.js
var init_clamp2 = __esm({
  "node_modules/@mui/utils/esm/clamp/index.js"() {
    init_clamp();
  }
});

// node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default;
var init_isHostComponent = __esm({
  "node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js"() {
    isHostComponent_default = isHostComponent;
  }
});

// node_modules/@mui/utils/esm/isHostComponent/index.js
var init_isHostComponent2 = __esm({
  "node_modules/@mui/utils/esm/isHostComponent/index.js"() {
    init_isHostComponent();
  }
});

// node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent_default(elementType)) {
    return otherProps;
  }
  return {
    ...otherProps,
    ownerState: {
      ...otherProps.ownerState,
      ...ownerState
    }
  };
}
var appendOwnerState_default;
var init_appendOwnerState = __esm({
  "node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js"() {
    init_isHostComponent2();
    appendOwnerState_default = appendOwnerState;
  }
});

// node_modules/@mui/utils/esm/appendOwnerState/index.js
var init_appendOwnerState2 = __esm({
  "node_modules/@mui/utils/esm/appendOwnerState/index.js"() {
    init_appendOwnerState();
  }
});

// node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var extractEventHandlers_default;
var init_extractEventHandlers = __esm({
  "node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js"() {
    extractEventHandlers_default = extractEventHandlers;
  }
});

// node_modules/@mui/utils/esm/extractEventHandlers/index.js
var init_extractEventHandlers2 = __esm({
  "node_modules/@mui/utils/esm/extractEventHandlers/index.js"() {
    init_extractEventHandlers();
  }
});

// node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var omitEventHandlers_default;
var init_omitEventHandlers = __esm({
  "node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js"() {
    omitEventHandlers_default = omitEventHandlers;
  }
});

// node_modules/@mui/utils/esm/omitEventHandlers/index.js
var init_omitEventHandlers2 = __esm({
  "node_modules/@mui/utils/esm/omitEventHandlers/index.js"() {
    init_omitEventHandlers();
  }
});

// node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = {
      ...additionalProps == null ? void 0 : additionalProps.style,
      ...externalForwardedProps == null ? void 0 : externalForwardedProps.style,
      ...externalSlotProps == null ? void 0 : externalSlotProps.style
    };
    const props2 = {
      ...additionalProps,
      ...externalForwardedProps,
      ...externalSlotProps
    };
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers_default({
    ...externalForwardedProps,
    ...externalSlotProps
  });
  const componentsPropsWithoutEventHandlers = omitEventHandlers_default(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers_default(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = {
    ...internalSlotProps == null ? void 0 : internalSlotProps.style,
    ...additionalProps == null ? void 0 : additionalProps.style,
    ...externalForwardedProps == null ? void 0 : externalForwardedProps.style,
    ...externalSlotProps == null ? void 0 : externalSlotProps.style
  };
  const props = {
    ...internalSlotProps,
    ...additionalProps,
    ...otherPropsWithoutEventHandlers,
    ...componentsPropsWithoutEventHandlers
  };
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var mergeSlotProps_default;
var init_mergeSlotProps = __esm({
  "node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js"() {
    init_clsx();
    init_extractEventHandlers2();
    init_omitEventHandlers2();
    mergeSlotProps_default = mergeSlotProps;
  }
});

// node_modules/@mui/utils/esm/mergeSlotProps/index.js
var init_mergeSlotProps2 = __esm({
  "node_modules/@mui/utils/esm/mergeSlotProps/index.js"() {
    init_mergeSlotProps();
  }
});

// node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}
var resolveComponentProps_default;
var init_resolveComponentProps = __esm({
  "node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js"() {
    resolveComponentProps_default = resolveComponentProps;
  }
});

// node_modules/@mui/utils/esm/resolveComponentProps/index.js
var init_resolveComponentProps2 = __esm({
  "node_modules/@mui/utils/esm/resolveComponentProps/index.js"() {
    init_resolveComponentProps();
  }
});

// node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
function useSlotProps(parameters) {
  var _a;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false,
    ...other
  } = parameters;
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps_default(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps_default({
    ...other,
    externalSlotProps: resolvedComponentsProps
  });
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_a = parameters.additionalProps) == null ? void 0 : _a.ref);
  const props = appendOwnerState_default(elementType, {
    ...mergedProps,
    ref
  }, ownerState);
  return props;
}
var useSlotProps_default;
var init_useSlotProps = __esm({
  "node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js"() {
    "use client";
    init_useForkRef2();
    init_appendOwnerState2();
    init_mergeSlotProps2();
    init_resolveComponentProps2();
    useSlotProps_default = useSlotProps;
  }
});

// node_modules/@mui/utils/esm/useSlotProps/index.js
var init_useSlotProps2 = __esm({
  "node_modules/@mui/utils/esm/useSlotProps/index.js"() {
    init_useSlotProps();
  }
});

// node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js
function getReactElementRef(element) {
  var _a;
  if (parseInt(React11.version, 10) >= 19) {
    return (_a = element.props) == null ? void 0 : _a.ref;
  }
  return element == null ? void 0 : element.ref;
}
var React11;
var init_getReactElementRef = __esm({
  "node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js"() {
    React11 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/getReactElementRef/index.js
var init_getReactElementRef2 = __esm({
  "node_modules/@mui/utils/esm/getReactElementRef/index.js"() {
    init_getReactElementRef();
  }
});

// node_modules/@mui/utils/esm/types.js
var init_types = __esm({
  "node_modules/@mui/utils/esm/types.js"() {
  }
});

// node_modules/@mui/utils/esm/index.js
var init_esm = __esm({
  "node_modules/@mui/utils/esm/index.js"() {
    init_chainPropTypes2();
    init_deepmerge2();
    init_deepmerge2();
    init_elementAcceptingRef2();
    init_elementTypeAcceptingRef2();
    init_exactProp2();
    init_formatMuiErrorMessage2();
    init_getDisplayName2();
    init_HTMLElementType2();
    init_ponyfillGlobal2();
    init_refType2();
    init_capitalize2();
    init_createChainedFunction2();
    init_debounce2();
    init_deprecatedPropType2();
    init_isMuiElement2();
    init_ownerDocument2();
    init_ownerWindow2();
    init_requirePropFactory2();
    init_setRef2();
    init_useEnhancedEffect2();
    init_useId2();
    init_unsupportedProp2();
    init_useControlled2();
    init_useEventCallback2();
    init_useForkRef2();
    init_useLazyRef2();
    init_useTimeout2();
    init_useOnMount2();
    init_isFocusVisible2();
    init_getScrollbarSize2();
    init_usePreviousProps2();
    init_getValidReactChildren2();
    init_visuallyHidden2();
    init_integerPropType2();
    init_resolveProps2();
    init_composeClasses2();
    init_generateUtilityClass2();
    init_generateUtilityClass2();
    init_generateUtilityClass2();
    init_generateUtilityClasses2();
    init_ClassNameGenerator2();
    init_clamp2();
    init_useSlotProps2();
    init_resolveComponentProps2();
    init_extractEventHandlers2();
    init_getReactElementRef2();
    init_types();
  }
});

// node_modules/@mui/material/utils/capitalize.js
var capitalize_default;
var init_capitalize3 = __esm({
  "node_modules/@mui/material/utils/capitalize.js"() {
    init_capitalize2();
    capitalize_default = capitalize;
  }
});

// node_modules/@mui/material/utils/createChainedFunction.js
var createChainedFunction_default;
var init_createChainedFunction3 = __esm({
  "node_modules/@mui/material/utils/createChainedFunction.js"() {
    init_createChainedFunction2();
    createChainedFunction_default = createChainedFunction;
  }
});

// node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
  return void 0;
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var isDevelopment, StyleSheet;
var init_emotion_sheet_development_esm = __esm({
  "node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js"() {
    isDevelopment = true;
    StyleSheet = function() {
      function StyleSheet2(options) {
        var _this = this;
        this._insertTag = function(tag) {
          var before;
          if (_this.tags.length === 0) {
            if (_this.insertionPoint) {
              before = _this.insertionPoint.nextSibling;
            } else if (_this.prepend) {
              before = _this.container.firstChild;
            } else {
              before = _this.before;
            }
          } else {
            before = _this.tags[_this.tags.length - 1].nextSibling;
          }
          _this.container.insertBefore(tag, before);
          _this.tags.push(tag);
        };
        this.isSpeedy = options.speedy === void 0 ? !isDevelopment : options.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = options.nonce;
        this.key = options.key;
        this.container = options.container;
        this.prepend = options.prepend;
        this.insertionPoint = options.insertionPoint;
        this.before = null;
      }
      var _proto = StyleSheet2.prototype;
      _proto.hydrate = function hydrate(nodes) {
        nodes.forEach(this._insertTag);
      };
      _proto.insert = function insert(rule) {
        if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
          this._insertTag(createStyleElement(this));
        }
        var tag = this.tags[this.tags.length - 1];
        {
          var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
          if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
            console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
          }
          this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
        }
        if (this.isSpeedy) {
          var sheet = sheetForTag(tag);
          try {
            sheet.insertRule(rule, sheet.cssRules.length);
          } catch (e) {
            if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
              console.error('There was a problem inserting the following rule: "' + rule + '"', e);
            }
          }
        } else {
          tag.appendChild(document.createTextNode(rule));
        }
        this.ctr++;
      };
      _proto.flush = function flush() {
        this.tags.forEach(function(tag) {
          var _tag$parentNode;
          return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
        });
        this.tags = [];
        this.ctr = 0;
        {
          this._alreadyInsertedOrderInsensitiveRule = false;
        }
      };
      return StyleSheet2;
    }();
  }
});

// node_modules/stylis/src/Enum.js
var MS, MOZ, WEBKIT, COMMENT, RULESET, DECLARATION, IMPORT, KEYFRAMES, LAYER;
var init_Enum = __esm({
  "node_modules/stylis/src/Enum.js"() {
    MS = "-ms-";
    MOZ = "-moz-";
    WEBKIT = "-webkit-";
    COMMENT = "comm";
    RULESET = "rule";
    DECLARATION = "decl";
    IMPORT = "@import";
    KEYFRAMES = "@keyframes";
    LAYER = "@layer";
  }
});

// node_modules/stylis/src/Utility.js
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var abs, from, assign;
var init_Utility = __esm({
  "node_modules/stylis/src/Utility.js"() {
    abs = Math.abs;
    from = String.fromCharCode;
    assign = Object.assign;
  }
});

// node_modules/stylis/src/Tokenizer.js
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
var line, column, length, position, character, characters;
var init_Tokenizer = __esm({
  "node_modules/stylis/src/Tokenizer.js"() {
    init_Utility();
    line = 1;
    column = 1;
    length = 0;
    position = 0;
    character = 0;
    characters = "";
  }
});

// node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
var init_Parser = __esm({
  "node_modules/stylis/src/Parser.js"() {
    init_Enum();
    init_Utility();
    init_Tokenizer();
  }
});

// node_modules/stylis/src/Prefixer.js
var init_Prefixer = __esm({
  "node_modules/stylis/src/Prefixer.js"() {
    init_Enum();
    init_Utility();
  }
});

// node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
var init_Serializer = __esm({
  "node_modules/stylis/src/Serializer.js"() {
    init_Enum();
    init_Utility();
  }
});

// node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
var init_Middleware = __esm({
  "node_modules/stylis/src/Middleware.js"() {
    init_Enum();
    init_Utility();
    init_Tokenizer();
    init_Serializer();
    init_Prefixer();
  }
});

// node_modules/stylis/index.js
var init_stylis = __esm({
  "node_modules/stylis/index.js"() {
    init_Enum();
    init_Utility();
    init_Parser();
    init_Prefixer();
    init_Tokenizer();
    init_Serializer();
    init_Middleware();
  }
});

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var weakMemoize;
var init_emotion_weak_memoize_esm = __esm({
  "node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js"() {
    weakMemoize = function weakMemoize2(func) {
      var cache2 = /* @__PURE__ */ new WeakMap();
      return function(arg2) {
        if (cache2.has(arg2)) {
          return cache2.get(arg2);
        }
        var ret = func(arg2);
        cache2.set(arg2, ret);
        return ret;
      };
    };
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache2 = /* @__PURE__ */ Object.create(null);
  return function(arg2) {
    if (cache2[arg2] === void 0) cache2[arg2] = fn(arg2);
    return cache2[arg2];
  };
}
var init_emotion_memoize_esm = __esm({
  "node_modules/@emotion/memoize/dist/emotion-memoize.esm.js"() {
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js
function prefix2(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
        case 109:
          if (charat(value, length2 + 4) !== 45) break;
        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
        case 115:
          return ~indexof(value, "stretch") ? prefix2(replace(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115) break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var identifierWithPointTracking, toRules, getRules, fixedElements, compat, removeLabel, ignoreFlag, isIgnoringComment, createUnsafeSelectorsAlarm, isImportRule, isPrependedWithRegularRules, nullifyElement, incorrectImportAlarm, prefixer, defaultStylisPlugins, createCache;
var init_emotion_cache_browser_development_esm = __esm({
  "node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js"() {
    init_emotion_sheet_development_esm();
    init_stylis();
    init_emotion_weak_memoize_esm();
    init_emotion_memoize_esm();
    identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
      var previous = 0;
      var character2 = 0;
      while (true) {
        previous = character2;
        character2 = peek();
        if (previous === 38 && character2 === 12) {
          points[index] = 1;
        }
        if (token(character2)) {
          break;
        }
        next();
      }
      return slice(begin, position);
    };
    toRules = function toRules2(parsed, points) {
      var index = -1;
      var character2 = 44;
      do {
        switch (token(character2)) {
          case 0:
            if (character2 === 38 && peek() === 12) {
              points[index] = 1;
            }
            parsed[index] += identifierWithPointTracking(position - 1, points, index);
            break;
          case 2:
            parsed[index] += delimit(character2);
            break;
          case 4:
            if (character2 === 44) {
              parsed[++index] = peek() === 58 ? "&\f" : "";
              points[index] = parsed[index].length;
              break;
            }
          default:
            parsed[index] += from(character2);
        }
      } while (character2 = next());
      return parsed;
    };
    getRules = function getRules2(value, points) {
      return dealloc(toRules(alloc(value), points));
    };
    fixedElements = /* @__PURE__ */ new WeakMap();
    compat = function compat2(element) {
      if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
      // negative .length indicates that this rule has been already prefixed
      element.length < 1) {
        return;
      }
      var value = element.value, parent = element.parent;
      var isImplicitRule = element.column === parent.column && element.line === parent.line;
      while (parent.type !== "rule") {
        parent = parent.parent;
        if (!parent) return;
      }
      if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
        return;
      }
      if (isImplicitRule) {
        return;
      }
      fixedElements.set(element, true);
      var points = [];
      var rules = getRules(value, points);
      var parentRules = parent.props;
      for (var i = 0, k = 0; i < rules.length; i++) {
        for (var j = 0; j < parentRules.length; j++, k++) {
          element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
        }
      }
    };
    removeLabel = function removeLabel2(element) {
      if (element.type === "decl") {
        var value = element.value;
        if (
          // charcode for l
          value.charCodeAt(0) === 108 && // charcode for b
          value.charCodeAt(2) === 98
        ) {
          element["return"] = "";
          element.value = "";
        }
      }
    };
    ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
    isIgnoringComment = function isIgnoringComment2(element) {
      return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
    };
    createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache2) {
      return function(element, index, children) {
        if (element.type !== "rule" || cache2.compat) return;
        var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
        if (unsafePseudoClasses) {
          var isNested = !!element.parent;
          var commentContainer = isNested ? element.parent.children : (
            // global rule at the root level
            children
          );
          for (var i = commentContainer.length - 1; i >= 0; i--) {
            var node2 = commentContainer[i];
            if (node2.line < element.line) {
              break;
            }
            if (node2.column < element.column) {
              if (isIgnoringComment(node2)) {
                return;
              }
              break;
            }
          }
          unsafePseudoClasses.forEach(function(unsafePseudoClass) {
            console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
          });
        }
      };
    };
    isImportRule = function isImportRule2(element) {
      return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
    };
    isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
      for (var i = index - 1; i >= 0; i--) {
        if (!isImportRule(children[i])) {
          return true;
        }
      }
      return false;
    };
    nullifyElement = function nullifyElement2(element) {
      element.type = "";
      element.value = "";
      element["return"] = "";
      element.children = "";
      element.props = "";
    };
    incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
      if (!isImportRule(element)) {
        return;
      }
      if (element.parent) {
        console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
        nullifyElement(element);
      } else if (isPrependedWithRegularRules(index, children)) {
        console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
        nullifyElement(element);
      }
    };
    prefixer = function prefixer2(element, index, children, callback) {
      if (element.length > -1) {
        if (!element["return"]) switch (element.type) {
          case DECLARATION:
            element["return"] = prefix2(element.value, element.length);
            break;
          case KEYFRAMES:
            return serialize([copy(element, {
              value: replace(element.value, "@", "@" + WEBKIT)
            })], callback);
          case RULESET:
            if (element.length) return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, {
                    props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
                  })], callback);
                case "::placeholder":
                  return serialize([copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
                  })], callback);
              }
              return "";
            });
        }
      }
    };
    defaultStylisPlugins = [prefixer];
    createCache = function createCache2(options) {
      var key = options.key;
      if (!key) {
        throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
      }
      if (key === "css") {
        var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(ssrStyles, function(node2) {
          var dataEmotionAttribute = node2.getAttribute("data-emotion");
          if (dataEmotionAttribute.indexOf(" ") === -1) {
            return;
          }
          document.head.appendChild(node2);
          node2.setAttribute("data-s", "");
        });
      }
      var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
      {
        if (/[^a-z-]/.test(key)) {
          throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
        }
      }
      var inserted = {};
      var container;
      var nodesToHydrate = [];
      {
        container = options.container || document.head;
        Array.prototype.forEach.call(
          // this means we will ignore elements which don't have a space in them which
          // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
          document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
          function(node2) {
            var attrib = node2.getAttribute("data-emotion").split(" ");
            for (var i = 1; i < attrib.length; i++) {
              inserted[attrib[i]] = true;
            }
            nodesToHydrate.push(node2);
          }
        );
      }
      var _insert;
      var omnipresentPlugins = [compat, removeLabel];
      {
        omnipresentPlugins.push(createUnsafeSelectorsAlarm({
          get compat() {
            return cache2.compat;
          }
        }), incorrectImportAlarm);
      }
      {
        var currentSheet;
        var finalizingPlugins = [stringify, function(element) {
          if (!element.root) {
            if (element["return"]) {
              currentSheet.insert(element["return"]);
            } else if (element.value && element.type !== COMMENT) {
              currentSheet.insert(element.value + "{}");
            }
          }
        }];
        var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
        var stylis = function stylis2(styles) {
          return serialize(compile(styles), serializer);
        };
        _insert = function insert(selector, serialized, sheet, shouldCache) {
          currentSheet = sheet;
          if (serialized.map !== void 0) {
            currentSheet = {
              insert: function insert2(rule) {
                sheet.insert(rule + serialized.map);
              }
            };
          }
          stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          if (shouldCache) {
            cache2.inserted[serialized.name] = true;
          }
        };
      }
      var cache2 = {
        key,
        sheet: new StyleSheet({
          key,
          container,
          nonce: options.nonce,
          speedy: options.speedy,
          prepend: options.prepend,
          insertionPoint: options.insertionPoint
        }),
        nonce: options.nonce,
        inserted,
        registered: {},
        insert: _insert
      };
      cache2.sheet.hydrate(nodesToHydrate);
      return cache2;
    };
  }
});

// node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js
var import_hoist_non_react_statics;
var init_emotion_react_isolated_hnrs_browser_development_esm = __esm({
  "node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js"() {
    import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var isBrowser, registerStyles, insertStyles;
var init_emotion_utils_browser_esm = __esm({
  "node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js"() {
    isBrowser = true;
    registerStyles = function registerStyles2(cache2, serialized, isStringTag2) {
      var className = cache2.key + "-" + serialized.name;
      if (
        // we only need to add the styles to the registered cache if the
        // class name could be used further down
        // the tree but if it's a string tag, we know it won't
        // so we don't have to add it to registered cache.
        // this improves memory usage since we can avoid storing the whole style string
        (isStringTag2 === false || // we need to always store it if we're in compat mode and
        // in node since emotion-server relies on whether a style is in
        // the registered cache to know whether a style is global or not
        // also, note that this check will be dead code eliminated in the browser
        isBrowser === false) && cache2.registered[className] === void 0
      ) {
        cache2.registered[className] = serialized.styles;
      }
    };
    insertStyles = function insertStyles2(cache2, serialized, isStringTag2) {
      registerStyles(cache2, serialized, isStringTag2);
      var className = cache2.key + "-" + serialized.name;
      if (cache2.inserted[serialized.name] === void 0) {
        var current = serialized;
        do {
          cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
          current = current.next;
        } while (current !== void 0);
      }
    };
  }
});

// node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var init_emotion_hash_esm = __esm({
  "node_modules/@emotion/hash/dist/emotion-hash.esm.js"() {
  }
});

// node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys;
var init_emotion_unitless_esm = __esm({
  "node_modules/@emotion/unitless/dist/emotion-unitless.esm.js"() {
    unitlessKeys = {
      animationIterationCount: 1,
      aspectRatio: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      scale: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      // SVG-related properties
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  var componentSelector = interpolation;
  if (componentSelector.__emotion_styles !== void 0) {
    if (String(componentSelector) === "NO_COMPONENT_SELECTOR") {
      throw new Error(noComponentSelectorMessage);
    }
    return componentSelector;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      var keyframes3 = interpolation;
      if (keyframes3.anim === 1) {
        cursor = {
          name: keyframes3.name,
          styles: keyframes3.styles,
          next: cursor
        };
        return keyframes3.name;
      }
      var serializedStyles = interpolation;
      if (serializedStyles.styles !== void 0) {
        var next2 = serializedStyles.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = serializedStyles.styles + ";";
        if (serializedStyles.map !== void 0) {
          styles += serializedStyles.map;
        }
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(_match, _p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\ncss`" + replaced + "`");
        }
      }
      break;
  }
  var asString = interpolation;
  if (registered == null) {
    return asString;
  }
  var cached = registered[asString];
  return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];
      if (typeof value !== "object") {
        var asString = value;
        if (registered != null && registered[asString] !== void 0) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === "NO_COMPONENT_SELECTOR" && isDevelopment2) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (key) {
            case "animation":
            case "animationName": {
              string += processStyleName(key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;
    if (asTemplateStringsArr[0] === void 0) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles += asTemplateStringsArr[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      var templateStringsArr = strings;
      if (templateStringsArr[i] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles += templateStringsArr[i];
    }
  }
  var sourceMap;
  {
    styles = styles.replace(sourceMapPattern, function(match3) {
      sourceMap = match3;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  {
    var devStyles = {
      name,
      styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
    return devStyles;
  }
}
var isDevelopment2, ILLEGAL_ESCAPE_SEQUENCE_ERROR, UNDEFINED_AS_OBJECT_KEY_ERROR, hyphenateRegex, animationRegex, isCustomProperty, isProcessableValue, processStyleName, processStyleValue, contentValuePattern, contentValues, oldProcessStyleValue, msPattern, hyphenPattern, hyphenatedCache, noComponentSelectorMessage, labelPattern, sourceMapPattern, cursor;
var init_emotion_serialize_development_esm = __esm({
  "node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js"() {
    init_emotion_hash_esm();
    init_emotion_unitless_esm();
    init_emotion_memoize_esm();
    isDevelopment2 = true;
    ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
    hyphenateRegex = /[A-Z]|^ms/g;
    animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
    isCustomProperty = function isCustomProperty2(property) {
      return property.charCodeAt(1) === 45;
    };
    isProcessableValue = function isProcessableValue2(value) {
      return value != null && typeof value !== "boolean";
    };
    processStyleName = memoize(function(styleName) {
      return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    });
    processStyleValue = function processStyleValue2(key, value) {
      switch (key) {
        case "animation":
        case "animationName": {
          if (typeof value === "string") {
            return value.replace(animationRegex, function(match2, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
      }
      if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
        return value + "px";
      }
      return value;
    };
    {
      contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
      contentValues = ["normal", "none", "initial", "inherit", "unset"];
      oldProcessStyleValue = processStyleValue;
      msPattern = /^-ms-/;
      hyphenPattern = /-(.)/g;
      hyphenatedCache = {};
      processStyleValue = function processStyleValue3(key, value) {
        if (key === "content") {
          if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
            throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
          }
        }
        var processed = oldProcessStyleValue(key, value);
        if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
          hyphenatedCache[key] = true;
          console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
            return _char.toUpperCase();
          }) + "?");
        }
        return processed;
      };
    }
    noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
    labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
    {
      sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
    }
  }
});

// node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var React12, syncFallback, useInsertionEffect2, useInsertionEffectAlwaysWithSyncFallback, useInsertionEffectWithLayoutFallback;
var init_emotion_use_insertion_effect_with_fallbacks_browser_esm = __esm({
  "node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js"() {
    React12 = __toESM(require_react());
    syncFallback = function syncFallback2(create) {
      return create();
    };
    useInsertionEffect2 = React12["useInsertionEffect"] ? React12["useInsertionEffect"] : false;
    useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect2 || syncFallback;
    useInsertionEffectWithLayoutFallback = useInsertionEffect2 || React12.useLayoutEffect;
  }
});

// node_modules/@emotion/react/dist/emotion-element-7a1343fa.browser.development.esm.js
var React13, import_react, EmotionCacheContext, CacheProvider, withEmotionCache, ThemeContext, getTheme, createCacheWithTheme, hasOwn, typePropName, labelPropName, Insertion, Emotion;
var init_emotion_element_7a1343fa_browser_development_esm = __esm({
  "node_modules/@emotion/react/dist/emotion-element-7a1343fa.browser.development.esm.js"() {
    React13 = __toESM(require_react());
    import_react = __toESM(require_react());
    init_emotion_cache_browser_development_esm();
    init_extends();
    init_emotion_weak_memoize_esm();
    init_emotion_react_isolated_hnrs_browser_development_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_development_esm();
    init_emotion_use_insertion_effect_with_fallbacks_browser_esm();
    EmotionCacheContext = React13.createContext(
      // we're doing this to avoid preconstruct's dead code elimination in this one case
      // because this module is primarily intended for the browser and node
      // but it's also required in react native and similar environments sometimes
      // and we could have a special build just for that
      // but this is much easier and the native packages
      // might use a different theme context in the future anyway
      typeof HTMLElement !== "undefined" ? createCache({
        key: "css"
      }) : null
    );
    {
      EmotionCacheContext.displayName = "EmotionCacheContext";
    }
    CacheProvider = EmotionCacheContext.Provider;
    withEmotionCache = function withEmotionCache2(func) {
      return (0, import_react.forwardRef)(function(props, ref) {
        var cache2 = (0, import_react.useContext)(EmotionCacheContext);
        return func(props, cache2, ref);
      });
    };
    ThemeContext = React13.createContext({});
    {
      ThemeContext.displayName = "EmotionThemeContext";
    }
    getTheme = function getTheme2(outerTheme, theme) {
      if (typeof theme === "function") {
        var mergedTheme = theme(outerTheme);
        if (mergedTheme == null || typeof mergedTheme !== "object" || Array.isArray(mergedTheme)) {
          throw new Error("[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!");
        }
        return mergedTheme;
      }
      if (theme == null || typeof theme !== "object" || Array.isArray(theme)) {
        throw new Error("[ThemeProvider] Please make your theme prop a plain object");
      }
      return _extends({}, outerTheme, theme);
    };
    createCacheWithTheme = weakMemoize(function(outerTheme) {
      return weakMemoize(function(theme) {
        return getTheme(outerTheme, theme);
      });
    });
    hasOwn = {}.hasOwnProperty;
    typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
    labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
    Insertion = function Insertion2(_ref) {
      var cache2 = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
      registerStyles(cache2, serialized, isStringTag2);
      useInsertionEffectAlwaysWithSyncFallback(function() {
        return insertStyles(cache2, serialized, isStringTag2);
      });
      return null;
    };
    Emotion = withEmotionCache(
      /* <any, any> */
      function(props, cache2, ref) {
        var cssProp = props.css;
        if (typeof cssProp === "string" && cache2.registered[cssProp] !== void 0) {
          cssProp = cache2.registered[cssProp];
        }
        var WrappedComponent = props[typePropName];
        var registeredStyles = [cssProp];
        var className = "";
        if (typeof props.className === "string") {
          className = getRegisteredStyles(cache2.registered, registeredStyles, props.className);
        } else if (props.className != null) {
          className = props.className + " ";
        }
        var serialized = serializeStyles(registeredStyles, void 0, React13.useContext(ThemeContext));
        if (serialized.name.indexOf("-") === -1) {
          var labelFromStack = props[labelPropName];
          if (labelFromStack) {
            serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
          }
        }
        className += cache2.key + "-" + serialized.name;
        var newProps = {};
        for (var key in props) {
          if (hasOwn.call(props, key) && key !== "css" && key !== typePropName && key !== labelPropName) {
            newProps[key] = props[key];
          }
        }
        newProps.className = className;
        if (ref) {
          newProps.ref = ref;
        }
        return React13.createElement(React13.Fragment, null, React13.createElement(Insertion, {
          cache: cache2,
          serialized,
          isStringTag: typeof WrappedComponent === "string"
        }), React13.createElement(WrappedComponent, newProps));
      }
    );
    {
      Emotion.displayName = "EmotionCssPropInternal";
    }
  }
});

// node_modules/@emotion/react/dist/emotion-react.browser.development.esm.js
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
function merge(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var React14, import_hoist_non_react_statics2, isDevelopment3, pkg, warnedAboutCssPropForGlobal, Global, keyframes, classnames, Insertion3, ClassNames, isBrowser2, isTestEnv, globalContext, globalKey;
var init_emotion_react_browser_development_esm = __esm({
  "node_modules/@emotion/react/dist/emotion-react.browser.development.esm.js"() {
    init_emotion_element_7a1343fa_browser_development_esm();
    init_emotion_element_7a1343fa_browser_development_esm();
    React14 = __toESM(require_react());
    init_emotion_utils_browser_esm();
    init_emotion_use_insertion_effect_with_fallbacks_browser_esm();
    init_emotion_serialize_development_esm();
    init_emotion_cache_browser_development_esm();
    init_extends();
    init_emotion_weak_memoize_esm();
    init_emotion_react_isolated_hnrs_browser_development_esm();
    import_hoist_non_react_statics2 = __toESM(require_hoist_non_react_statics_cjs());
    isDevelopment3 = true;
    pkg = {
      name: "@emotion/react",
      version: "11.13.3",
      main: "dist/emotion-react.cjs.js",
      module: "dist/emotion-react.esm.js",
      exports: {
        ".": {
          types: {
            "import": "./dist/emotion-react.cjs.mjs",
            "default": "./dist/emotion-react.cjs.js"
          },
          development: {
            "edge-light": {
              module: "./dist/emotion-react.development.edge-light.esm.js",
              "import": "./dist/emotion-react.development.edge-light.cjs.mjs",
              "default": "./dist/emotion-react.development.edge-light.cjs.js"
            },
            worker: {
              module: "./dist/emotion-react.development.edge-light.esm.js",
              "import": "./dist/emotion-react.development.edge-light.cjs.mjs",
              "default": "./dist/emotion-react.development.edge-light.cjs.js"
            },
            workerd: {
              module: "./dist/emotion-react.development.edge-light.esm.js",
              "import": "./dist/emotion-react.development.edge-light.cjs.mjs",
              "default": "./dist/emotion-react.development.edge-light.cjs.js"
            },
            browser: {
              module: "./dist/emotion-react.browser.development.esm.js",
              "import": "./dist/emotion-react.browser.development.cjs.mjs",
              "default": "./dist/emotion-react.browser.development.cjs.js"
            },
            module: "./dist/emotion-react.development.esm.js",
            "import": "./dist/emotion-react.development.cjs.mjs",
            "default": "./dist/emotion-react.development.cjs.js"
          },
          "edge-light": {
            module: "./dist/emotion-react.edge-light.esm.js",
            "import": "./dist/emotion-react.edge-light.cjs.mjs",
            "default": "./dist/emotion-react.edge-light.cjs.js"
          },
          worker: {
            module: "./dist/emotion-react.edge-light.esm.js",
            "import": "./dist/emotion-react.edge-light.cjs.mjs",
            "default": "./dist/emotion-react.edge-light.cjs.js"
          },
          workerd: {
            module: "./dist/emotion-react.edge-light.esm.js",
            "import": "./dist/emotion-react.edge-light.cjs.mjs",
            "default": "./dist/emotion-react.edge-light.cjs.js"
          },
          browser: {
            module: "./dist/emotion-react.browser.esm.js",
            "import": "./dist/emotion-react.browser.cjs.mjs",
            "default": "./dist/emotion-react.browser.cjs.js"
          },
          module: "./dist/emotion-react.esm.js",
          "import": "./dist/emotion-react.cjs.mjs",
          "default": "./dist/emotion-react.cjs.js"
        },
        "./jsx-runtime": {
          types: {
            "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
            "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
          },
          development: {
            "edge-light": {
              module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
              "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
              "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
            },
            worker: {
              module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
              "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
              "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
            },
            workerd: {
              module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
              "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
              "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
            },
            browser: {
              module: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.esm.js",
              "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.cjs.mjs",
              "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.cjs.js"
            },
            module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.esm.js",
            "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.cjs.mjs",
            "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.cjs.js"
          },
          "edge-light": {
            module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
            "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
            "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
          },
          worker: {
            module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
            "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
            "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
          },
          workerd: {
            module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
            "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
            "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
          },
          browser: {
            module: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
            "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.cjs.mjs",
            "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.cjs.js"
          },
          module: "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js",
          "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
          "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
        },
        "./_isolated-hnrs": {
          types: {
            "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
            "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
          },
          development: {
            "edge-light": {
              module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
              "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
              "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
            },
            worker: {
              module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
              "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
              "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
            },
            workerd: {
              module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
              "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
              "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
            },
            browser: {
              module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js",
              "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.cjs.mjs",
              "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.cjs.js"
            },
            module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.esm.js",
            "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.cjs.mjs",
            "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.cjs.js"
          },
          "edge-light": {
            module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
            "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
            "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
          },
          worker: {
            module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
            "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
            "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
          },
          workerd: {
            module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
            "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
            "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
          },
          browser: {
            module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
            "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.cjs.mjs",
            "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.cjs.js"
          },
          module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js",
          "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
          "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
        },
        "./jsx-dev-runtime": {
          types: {
            "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
            "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
          },
          development: {
            "edge-light": {
              module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
              "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
              "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
            },
            worker: {
              module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
              "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
              "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
            },
            workerd: {
              module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
              "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
              "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
            },
            browser: {
              module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.esm.js",
              "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.cjs.mjs",
              "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.cjs.js"
            },
            module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.esm.js",
            "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.cjs.mjs",
            "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.cjs.js"
          },
          "edge-light": {
            module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
            "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
            "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
          },
          worker: {
            module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
            "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
            "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
          },
          workerd: {
            module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
            "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
            "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
          },
          browser: {
            module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
            "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.cjs.mjs",
            "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.cjs.js"
          },
          module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js",
          "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
          "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
        },
        "./package.json": "./package.json",
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": {
          types: {
            "import": "./macro.d.mts",
            "default": "./macro.d.ts"
          },
          "default": "./macro.js"
        }
      },
      imports: {
        "#is-development": {
          development: "./src/conditions/true.js",
          "default": "./src/conditions/false.js"
        },
        "#is-browser": {
          "edge-light": "./src/conditions/false.js",
          workerd: "./src/conditions/false.js",
          worker: "./src/conditions/false.js",
          browser: "./src/conditions/true.js",
          "default": "./src/conditions/is-browser.js"
        }
      },
      types: "types/index.d.ts",
      files: [
        "src",
        "dist",
        "jsx-runtime",
        "jsx-dev-runtime",
        "_isolated-hnrs",
        "types/*.d.ts",
        "macro.*"
      ],
      sideEffects: false,
      author: "Emotion Contributors",
      license: "MIT",
      scripts: {
        "test:typescript": "dtslint types"
      },
      dependencies: {
        "@babel/runtime": "^7.18.3",
        "@emotion/babel-plugin": "^11.12.0",
        "@emotion/cache": "^11.13.0",
        "@emotion/serialize": "^1.3.1",
        "@emotion/use-insertion-effect-with-fallbacks": "^1.1.0",
        "@emotion/utils": "^1.4.0",
        "@emotion/weak-memoize": "^0.4.0",
        "hoist-non-react-statics": "^3.3.1"
      },
      peerDependencies: {
        react: ">=16.8.0"
      },
      peerDependenciesMeta: {
        "@types/react": {
          optional: true
        }
      },
      devDependencies: {
        "@definitelytyped/dtslint": "0.0.112",
        "@emotion/css": "11.13.0",
        "@emotion/css-prettifier": "1.1.4",
        "@emotion/server": "11.11.0",
        "@emotion/styled": "11.13.0",
        "html-tag-names": "^1.1.2",
        react: "16.14.0",
        "svg-tag-names": "^1.1.1",
        typescript: "^5.4.5"
      },
      repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
      publishConfig: {
        access: "public"
      },
      "umd:main": "dist/emotion-react.umd.min.js",
      preconstruct: {
        entrypoints: [
          "./index.js",
          "./jsx-runtime.js",
          "./jsx-dev-runtime.js",
          "./_isolated-hnrs.js"
        ],
        umdName: "emotionReact",
        exports: {
          extra: {
            "./types/css-prop": "./types/css-prop.d.ts",
            "./macro": {
              types: {
                "import": "./macro.d.mts",
                "default": "./macro.d.ts"
              },
              "default": "./macro.js"
            }
          }
        }
      }
    };
    warnedAboutCssPropForGlobal = false;
    Global = withEmotionCache(function(props, cache2) {
      if (!warnedAboutCssPropForGlobal && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // I don't really want to add it to the type since it shouldn't be used
      (props.className || props.css)) {
        console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
        warnedAboutCssPropForGlobal = true;
      }
      var styles = props.styles;
      var serialized = serializeStyles([styles], void 0, React14.useContext(ThemeContext));
      var sheetRef = React14.useRef();
      useInsertionEffectWithLayoutFallback(function() {
        var key = cache2.key + "-global";
        var sheet = new cache2.sheet.constructor({
          key,
          nonce: cache2.sheet.nonce,
          container: cache2.sheet.container,
          speedy: cache2.sheet.isSpeedy
        });
        var rehydrating = false;
        var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
        if (cache2.sheet.tags.length) {
          sheet.before = cache2.sheet.tags[0];
        }
        if (node2 !== null) {
          rehydrating = true;
          node2.setAttribute("data-emotion", key);
          sheet.hydrate([node2]);
        }
        sheetRef.current = [sheet, rehydrating];
        return function() {
          sheet.flush();
        };
      }, [cache2]);
      useInsertionEffectWithLayoutFallback(function() {
        var sheetRefCurrent = sheetRef.current;
        var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
        if (rehydrating) {
          sheetRefCurrent[1] = false;
          return;
        }
        if (serialized.next !== void 0) {
          insertStyles(cache2, serialized.next, true);
        }
        if (sheet.tags.length) {
          var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
          sheet.before = element;
          sheet.flush();
        }
        cache2.insert("", serialized, sheet, false);
      }, [cache2, serialized.name]);
      return null;
    });
    {
      Global.displayName = "EmotionGlobal";
    }
    keyframes = function keyframes2() {
      var insertable = css.apply(void 0, arguments);
      var name = "animation-" + insertable.name;
      return {
        name,
        styles: "@keyframes " + name + "{" + insertable.styles + "}",
        anim: 1,
        toString: function toString() {
          return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
        }
      };
    };
    classnames = function classnames2(args) {
      var len = args.length;
      var i = 0;
      var cls = "";
      for (; i < len; i++) {
        var arg2 = args[i];
        if (arg2 == null) continue;
        var toAdd = void 0;
        switch (typeof arg2) {
          case "boolean":
            break;
          case "object": {
            if (Array.isArray(arg2)) {
              toAdd = classnames2(arg2);
            } else {
              if (arg2.styles !== void 0 && arg2.name !== void 0) {
                console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.");
              }
              toAdd = "";
              for (var k in arg2) {
                if (arg2[k] && k) {
                  toAdd && (toAdd += " ");
                  toAdd += k;
                }
              }
            }
            break;
          }
          default: {
            toAdd = arg2;
          }
        }
        if (toAdd) {
          cls && (cls += " ");
          cls += toAdd;
        }
      }
      return cls;
    };
    Insertion3 = function Insertion4(_ref) {
      var cache2 = _ref.cache, serializedArr = _ref.serializedArr;
      useInsertionEffectAlwaysWithSyncFallback(function() {
        for (var i = 0; i < serializedArr.length; i++) {
          insertStyles(cache2, serializedArr[i], false);
        }
      });
      return null;
    };
    ClassNames = withEmotionCache(function(props, cache2) {
      var hasRendered = false;
      var serializedArr = [];
      var css2 = function css3() {
        if (hasRendered && isDevelopment3) {
          throw new Error("css can only be used during render");
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serializeStyles(args, cache2.registered);
        serializedArr.push(serialized);
        registerStyles(cache2, serialized, false);
        return cache2.key + "-" + serialized.name;
      };
      var cx = function cx2() {
        if (hasRendered && isDevelopment3) {
          throw new Error("cx can only be used during render");
        }
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return merge(cache2.registered, css2, classnames(args));
      };
      var content = {
        css: css2,
        cx,
        theme: React14.useContext(ThemeContext)
      };
      var ele = props.children(content);
      hasRendered = true;
      return React14.createElement(React14.Fragment, null, React14.createElement(Insertion3, {
        cache: cache2,
        serializedArr
      }), ele);
    });
    {
      ClassNames.displayName = "EmotionClassNames";
    }
    {
      isBrowser2 = typeof document !== "undefined";
      isTestEnv = typeof jest !== "undefined" || typeof vi !== "undefined";
      if (isBrowser2 && !isTestEnv) {
        globalContext = // $FlowIgnore
        typeof globalThis !== "undefined" ? globalThis : isBrowser2 ? window : global;
        globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
        if (globalContext[globalKey]) {
          console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
        }
        globalContext[globalKey] = true;
      }
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var React40 = require_react();
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React40.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName2(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName2(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign2 = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign2({}, props, {
                  value: prevLog
                }),
                info: assign2({}, props, {
                  value: prevInfo
                }),
                warn: assign2({}, props, {
                  value: prevWarn
                }),
                error: assign2({}, props, {
                  value: prevError
                }),
                group: assign2({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign2({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign2({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix3;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix3 === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match2 = x.stack.trim().match(/\n( *(at )?)/);
                prefix3 = match2 && match2[1] || "";
              }
            }
            return "\n" + prefix3 + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values2, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values2, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self2) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self2, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self2) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self2);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement5(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node2, parentType) {
          {
            if (typeof node2 !== "object") {
              return;
            }
            if (isArray(node2)) {
              for (var i = 0; i < node2.length; i++) {
                var child = node2[i];
                if (isValidElement5(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement5(node2)) {
              if (node2._store) {
                node2._store.validated = true;
              }
            } else if (node2) {
              var iteratorFn = getIteratorFn(node2);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node2.entries) {
                  var iterator = iteratorFn.call(node2);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement5(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        var didWarnAboutKeySpread = {};
        function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self2);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            {
              if (hasOwnProperty.call(props, "key")) {
                var componentName = getComponentNameFromType(type);
                var keys = Object.keys(props).filter(function(k) {
                  return k !== "key";
                });
                var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                  var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                  error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                  didWarnAboutKeySpread[componentName + beforeExample] = true;
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx = jsxWithValidationDynamic;
        var jsxs = jsxWithValidationStatic;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = jsx;
        exports.jsxs = jsxs;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
function StyledEngineProvider(props) {
  const {
    injectFirst,
    children
  } = props;
  return injectFirst && cache ? (0, import_jsx_runtime.jsx)(CacheProvider, {
    value: cache,
    children
  }) : children;
}
var React15, import_prop_types4, import_jsx_runtime, createEmotionCache, cache;
var init_StyledEngineProvider = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js"() {
    "use client";
    React15 = __toESM(require_react());
    import_prop_types4 = __toESM(require_prop_types());
    init_emotion_react_browser_development_esm();
    init_emotion_cache_browser_development_esm();
    init_emotion_sheet_development_esm();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    createEmotionCache = (options) => {
      const cache2 = createCache(options);
      class MyStyleSheet extends StyleSheet {
        constructor(args) {
          super(args);
          this.prepend = cache2.sheet.prepend;
        }
      }
      cache2.sheet = new MyStyleSheet({
        key: cache2.key,
        nonce: cache2.sheet.nonce,
        container: cache2.sheet.container,
        speedy: cache2.sheet.isSpeedy,
        prepend: cache2.sheet.prepend,
        insertionPoint: cache2.sheet.insertionPoint
      });
      return cache2;
    };
    if (typeof document === "object") {
      cache = createEmotionCache({
        key: "css",
        prepend: true
      });
    }
    true ? StyledEngineProvider.propTypes = {
      /**
       * Your component tree.
       */
      children: import_prop_types4.default.node,
      /**
       * By default, the styles are injected last in the <head> element of the page.
       * As a result, they gain more specificity than any other style sheet.
       * If you want to override MUI's styles, set this prop.
       */
      injectFirst: import_prop_types4.default.bool
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/StyledEngineProvider/index.js
var init_StyledEngineProvider2 = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/index.js"() {
    init_StyledEngineProvider();
  }
});

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var reactPropsRegex, isPropValid;
var init_emotion_is_prop_valid_esm = __esm({
  "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js"() {
    init_emotion_memoize_esm();
    reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    isPropValid = memoize(
      function(prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
      /* Z+1 */
    );
  }
});

// node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.development.esm.js
var React16, testOmitPropsOnStringTag, testOmitPropsOnComponent, getDefaultShouldForwardProp, composeShouldForwardProps, isDevelopment4, ILLEGAL_ESCAPE_SEQUENCE_ERROR2, Insertion5, createStyled;
var init_emotion_styled_base_browser_development_esm = __esm({
  "node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.development.esm.js"() {
    init_extends();
    React16 = __toESM(require_react());
    init_emotion_is_prop_valid_esm();
    init_emotion_react_browser_development_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_development_esm();
    init_emotion_use_insertion_effect_with_fallbacks_browser_esm();
    testOmitPropsOnStringTag = isPropValid;
    testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
      return key !== "theme";
    };
    getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
      return typeof tag === "string" && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
    };
    composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
      var shouldForwardProp2;
      if (options) {
        var optionsShouldForwardProp = options.shouldForwardProp;
        shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
          return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
        } : optionsShouldForwardProp;
      }
      if (typeof shouldForwardProp2 !== "function" && isReal) {
        shouldForwardProp2 = tag.__emotion_forwardProp;
      }
      return shouldForwardProp2;
    };
    isDevelopment4 = true;
    ILLEGAL_ESCAPE_SEQUENCE_ERROR2 = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    Insertion5 = function Insertion6(_ref) {
      var cache2 = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
      registerStyles(cache2, serialized, isStringTag2);
      useInsertionEffectAlwaysWithSyncFallback(function() {
        return insertStyles(cache2, serialized, isStringTag2);
      });
      return null;
    };
    createStyled = function createStyled2(tag, options) {
      {
        if (tag === void 0) {
          throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
        }
      }
      var isReal = tag.__emotion_real === tag;
      var baseTag = isReal && tag.__emotion_base || tag;
      var identifierName;
      var targetClassName;
      if (options !== void 0) {
        identifierName = options.label;
        targetClassName = options.target;
      }
      var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
      var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
      var shouldUseAs = !defaultShouldForwardProp("as");
      return function() {
        var args = arguments;
        var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
        if (identifierName !== void 0) {
          styles.push("label:" + identifierName + ";");
        }
        if (args[0] == null || args[0].raw === void 0) {
          styles.push.apply(styles, args);
        } else {
          if (args[0][0] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR2);
          }
          styles.push(args[0][0]);
          var len = args.length;
          var i = 1;
          for (; i < len; i++) {
            if (args[0][i] === void 0) {
              console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR2);
            }
            styles.push(args[i], args[0][i]);
          }
        }
        var Styled = withEmotionCache(function(props, cache2, ref) {
          var FinalTag = shouldUseAs && props.as || baseTag;
          var className = "";
          var classInterpolations = [];
          var mergedProps = props;
          if (props.theme == null) {
            mergedProps = {};
            for (var key in props) {
              mergedProps[key] = props[key];
            }
            mergedProps.theme = React16.useContext(ThemeContext);
          }
          if (typeof props.className === "string") {
            className = getRegisteredStyles(cache2.registered, classInterpolations, props.className);
          } else if (props.className != null) {
            className = props.className + " ";
          }
          var serialized = serializeStyles(styles.concat(classInterpolations), cache2.registered, mergedProps);
          className += cache2.key + "-" + serialized.name;
          if (targetClassName !== void 0) {
            className += " " + targetClassName;
          }
          var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
          var newProps = {};
          for (var _key in props) {
            if (shouldUseAs && _key === "as") continue;
            if (finalShouldForwardProp(_key)) {
              newProps[_key] = props[_key];
            }
          }
          newProps.className = className;
          if (ref) {
            newProps.ref = ref;
          }
          return React16.createElement(React16.Fragment, null, React16.createElement(Insertion5, {
            cache: cache2,
            serialized,
            isStringTag: typeof FinalTag === "string"
          }), React16.createElement(FinalTag, newProps));
        });
        Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
        Styled.defaultProps = tag.defaultProps;
        Styled.__emotion_real = Styled;
        Styled.__emotion_base = baseTag;
        Styled.__emotion_styles = styles;
        Styled.__emotion_forwardProp = shouldForwardProp2;
        Object.defineProperty(Styled, "toString", {
          value: function value() {
            if (targetClassName === void 0 && isDevelopment4) {
              return "NO_COMPONENT_SELECTOR";
            }
            return "." + targetClassName;
          }
        });
        Styled.withComponent = function(nextTag, nextOptions) {
          return createStyled2(nextTag, _extends({}, options, nextOptions, {
            shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
          })).apply(void 0, styles);
        };
        return Styled;
      };
    };
  }
});

// node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js
var import_react4, tags, newStyled;
var init_emotion_styled_browser_development_esm = __esm({
  "node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js"() {
    init_emotion_styled_base_browser_development_esm();
    init_extends();
    import_react4 = __toESM(require_react());
    init_emotion_is_prop_valid_esm();
    init_emotion_react_browser_development_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_development_esm();
    init_emotion_use_insertion_effect_with_fallbacks_browser_esm();
    tags = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
      // SVG
      "circle",
      "clipPath",
      "defs",
      "ellipse",
      "foreignObject",
      "g",
      "image",
      "line",
      "linearGradient",
      "mask",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "stop",
      "svg",
      "text",
      "tspan"
    ];
    newStyled = createStyled.bind();
    tags.forEach(function(tagName) {
      newStyled[tagName] = newStyled(tagName);
    });
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles,
    defaultTheme: defaultTheme5 = {}
  } = props;
  const globalStyles = typeof styles === "function" ? (themeInput) => styles(isEmpty(themeInput) ? defaultTheme5 : themeInput) : styles;
  return (0, import_jsx_runtime2.jsx)(Global, {
    styles: globalStyles
  });
}
var React17, import_prop_types5, import_jsx_runtime2;
var init_GlobalStyles = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js"() {
    "use client";
    React17 = __toESM(require_react());
    import_prop_types5 = __toESM(require_prop_types());
    init_emotion_react_browser_development_esm();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    true ? GlobalStyles.propTypes = {
      defaultTheme: import_prop_types5.default.object,
      styles: import_prop_types5.default.oneOfType([import_prop_types5.default.array, import_prop_types5.default.string, import_prop_types5.default.object, import_prop_types5.default.func])
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/index.js
var init_GlobalStyles2 = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/index.js"() {
    init_GlobalStyles();
  }
});

// node_modules/@mui/styled-engine/index.js
function styled(tag, options) {
  const stylesFactory = newStyled(tag, options);
  if (true) {
    return (...styles) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles.some((style4) => style4 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }
  return stylesFactory;
}
var internal_processStyles;
var init_styled_engine = __esm({
  "node_modules/@mui/styled-engine/index.js"() {
    init_emotion_styled_browser_development_esm();
    init_emotion_react_browser_development_esm();
    init_StyledEngineProvider2();
    init_GlobalStyles2();
    internal_processStyles = (tag, processor) => {
      if (Array.isArray(tag.__emotion_styles)) {
        tag.__emotion_styles = processor(tag.__emotion_styles);
      }
    };
  }
});

// node_modules/@mui/system/createBreakpoints/createBreakpoints.js
function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: values2 = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit = "px",
    step = 5,
    ...other
  } = breakpoints;
  const sortedValues = sortBreakpointsValues(values2);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values2[start] === "number" ? values2[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values2[keys[endIndex]] === "number" ? values2[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit,
    ...other
  };
}
var sortBreakpointsValues;
var init_createBreakpoints = __esm({
  "node_modules/@mui/system/createBreakpoints/createBreakpoints.js"() {
    sortBreakpointsValues = (values2) => {
      const breakpointsAsArray = Object.keys(values2).map((key) => ({
        key,
        val: values2[key]
      })) || [];
      breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
      return breakpointsAsArray.reduce((acc, obj) => {
        return {
          ...acc,
          [obj.key]: obj.val
        };
      }, {});
    };
  }
});

// node_modules/@mui/system/useThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}
var init_getThemeProps = __esm({
  "node_modules/@mui/system/useThemeProps/getThemeProps.js"() {
    init_resolveProps2();
  }
});

// node_modules/@mui/system/cssContainerQueries/cssContainerQueries.js
function sortContainerQueries(theme, css2) {
  if (!theme.containerQueries) {
    return css2;
  }
  const sorted = Object.keys(css2).filter((key) => key.startsWith("@container")).sort((a, b) => {
    var _a, _b;
    const regex = /min-width:\s*([0-9.]+)/;
    return +(((_a = a.match(regex)) == null ? void 0 : _a[1]) || 0) - +(((_b = b.match(regex)) == null ? void 0 : _b[1]) || 0);
  });
  if (!sorted.length) {
    return css2;
  }
  return sorted.reduce((acc, key) => {
    const value = css2[key];
    delete acc[key];
    acc[key] = value;
    return acc;
  }, {
    ...css2
  });
}
function isCqShorthand(breakpointKeys, value) {
  return value === "@" || value.startsWith("@") && (breakpointKeys.some((key) => value.startsWith(`@${key}`)) || !!value.match(/^@\d/));
}
function getContainerQuery(theme, shorthand) {
  const matches = shorthand.match(/^@([^/]+)?\/?(.+)?$/);
  if (!matches) {
    if (true) {
      throw new Error(true ? `MUI: The provided shorthand ${`(${shorthand})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : formatMuiErrorMessage(18, `(${shorthand})`));
    }
    return null;
  }
  const [, containerQuery, containerName] = matches;
  const value = Number.isNaN(+containerQuery) ? containerQuery || 0 : +containerQuery;
  return theme.containerQueries(containerName).up(value);
}
function cssContainerQueries(themeInput) {
  const toContainerQuery = (mediaQuery, name) => mediaQuery.replace("@media", name ? `@container ${name}` : "@container");
  function attachCq(node3, name) {
    node3.up = (...args) => toContainerQuery(themeInput.breakpoints.up(...args), name);
    node3.down = (...args) => toContainerQuery(themeInput.breakpoints.down(...args), name);
    node3.between = (...args) => toContainerQuery(themeInput.breakpoints.between(...args), name);
    node3.only = (...args) => toContainerQuery(themeInput.breakpoints.only(...args), name);
    node3.not = (...args) => {
      const result = toContainerQuery(themeInput.breakpoints.not(...args), name);
      if (result.includes("not all and")) {
        return result.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or");
      }
      return result;
    };
  }
  const node2 = {};
  const containerQueries = (name) => {
    attachCq(node2, name);
    return node2;
  };
  attachCq(containerQueries);
  return {
    ...themeInput,
    containerQueries
  };
}
var init_cssContainerQueries = __esm({
  "node_modules/@mui/system/cssContainerQueries/cssContainerQueries.js"() {
    init_formatMuiErrorMessage2();
  }
});

// node_modules/@mui/system/cssContainerQueries/index.js
var init_cssContainerQueries2 = __esm({
  "node_modules/@mui/system/cssContainerQueries/index.js"() {
    init_cssContainerQueries();
    init_cssContainerQueries();
  }
});

// node_modules/@mui/system/createTheme/shape.js
var shape, shape_default;
var init_shape = __esm({
  "node_modules/@mui/system/createTheme/shape.js"() {
    shape = {
      borderRadius: 4
    };
    shape_default = shape;
  }
});

// node_modules/@mui/system/responsivePropType/responsivePropType.js
var import_prop_types6, responsivePropType, responsivePropType_default;
var init_responsivePropType = __esm({
  "node_modules/@mui/system/responsivePropType/responsivePropType.js"() {
    import_prop_types6 = __toESM(require_prop_types());
    responsivePropType = true ? import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string, import_prop_types6.default.object, import_prop_types6.default.array]) : {};
    responsivePropType_default = responsivePropType;
  }
});

// node_modules/@mui/system/responsivePropType/index.js
var init_responsivePropType2 = __esm({
  "node_modules/@mui/system/responsivePropType/index.js"() {
    init_responsivePropType();
  }
});

// node_modules/@mui/system/merge/merge.js
function merge2(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
    // No need to clone deep, it's way faster.
  });
}
var merge_default;
var init_merge = __esm({
  "node_modules/@mui/system/merge/merge.js"() {
    init_deepmerge2();
    merge_default = merge2;
  }
});

// node_modules/@mui/system/merge/index.js
var init_merge2 = __esm({
  "node_modules/@mui/system/merge/index.js"() {
    init_merge();
  }
});

// node_modules/@mui/system/breakpoints/breakpoints.js
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (isCqShorthand(themeBreakpoints.keys, breakpoint)) {
        const containerKey = getContainerQuery(theme.containerQueries ? theme : defaultContainerQueries, breakpoint);
        if (containerKey) {
          acc[containerKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
        }
      } else if (Object.keys(themeBreakpoints.values || values).includes(breakpoint)) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _a;
  const breakpointsInOrder = (_a = breakpointsInput.keys) == null ? void 0 : _a.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style4) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style4);
}
function mergeBreakpointsInOrder(breakpointsInput, ...styles) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce((prev2, next2) => deepmerge(prev2, next2), {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}
function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  if (typeof breakpointValues !== "object") {
    return {};
  }
  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}
function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);
  if (keys.length === 0) {
    return breakpointValues;
  }
  let previous;
  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === "object") {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}
var import_prop_types7, values, defaultBreakpoints, defaultContainerQueries;
var init_breakpoints = __esm({
  "node_modules/@mui/system/breakpoints/breakpoints.js"() {
    import_prop_types7 = __toESM(require_prop_types());
    init_deepmerge2();
    init_merge2();
    init_cssContainerQueries2();
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    };
    defaultBreakpoints = {
      // Sorted ASC by size. That's important.
      // It can't be configured as it's used statically for propTypes.
      keys: ["xs", "sm", "md", "lg", "xl"],
      up: (key) => `@media (min-width:${values[key]}px)`
    };
    defaultContainerQueries = {
      containerQueries: (containerName) => ({
        up: (key) => {
          let result = typeof key === "number" ? key : values[key] || key;
          if (typeof result === "number") {
            result = `${result}px`;
          }
          return containerName ? `@container ${containerName} (min-width:${result})` : `@container (min-width:${result})`;
        }
      })
    };
  }
});

// node_modules/@mui/system/breakpoints/index.js
var init_breakpoints2 = __esm({
  "node_modules/@mui/system/breakpoints/index.js"() {
    init_breakpoints();
    init_breakpoints();
  }
});

// node_modules/@mui/system/style/style.js
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform) {
    value = transform(value, userValue, themeMapping);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;
  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = true ? {
    [prop]: responsivePropType_default
  } : {};
  fn.filterProps = [prop];
  return fn;
}
var style_default;
var init_style = __esm({
  "node_modules/@mui/system/style/style.js"() {
    init_capitalize2();
    init_responsivePropType2();
    init_breakpoints2();
    style_default = style;
  }
});

// node_modules/@mui/system/style/index.js
var init_style2 = __esm({
  "node_modules/@mui/system/style/index.js"() {
    init_style();
    init_style();
  }
});

// node_modules/@mui/system/memoize/memoize.js
function memoize2(fn) {
  const cache2 = {};
  return (arg2) => {
    if (cache2[arg2] === void 0) {
      cache2[arg2] = fn(arg2);
    }
    return cache2[arg2];
  };
}
var init_memoize = __esm({
  "node_modules/@mui/system/memoize/memoize.js"() {
  }
});

// node_modules/@mui/system/memoize/index.js
var init_memoize2 = __esm({
  "node_modules/@mui/system/memoize/index.js"() {
    init_memoize();
  }
});

// node_modules/@mui/system/spacing/spacing.js
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey, true) ?? defaultValue;
  if (typeof themeSpacing === "number" || typeof themeSpacing === "string") {
    return (val) => {
      if (typeof val === "string") {
        return val;
      }
      if (true) {
        if (typeof val !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${val}.`);
        }
      }
      if (typeof themeSpacing === "string") {
        return `calc(${val} * ${themeSpacing})`;
      }
      return themeSpacing * val;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (val) => {
      if (typeof val === "string") {
        return val;
      }
      const abs2 = Math.abs(val);
      if (true) {
        if (!Number.isInteger(abs2)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs2 > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs2}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs2} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      const transformed = themeSpacing[abs2];
      if (val >= 0) {
        return transformed;
      }
      if (typeof transformed === "number") {
        return -transformed;
      }
      return `-${transformed}`;
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (true) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  return transformer(propValue);
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (!keys.includes(prop)) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
function padding(props) {
  return style2(props, paddingKeys);
}
function spacing(props) {
  return style2(props, spacingKeys);
}
var properties, directions, aliases, getCssProperties, marginKeys, paddingKeys, spacingKeys, spacing_default;
var init_spacing = __esm({
  "node_modules/@mui/system/spacing/spacing.js"() {
    init_responsivePropType2();
    init_breakpoints2();
    init_style2();
    init_merge2();
    init_memoize2();
    properties = {
      m: "margin",
      p: "padding"
    };
    directions = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: ["Left", "Right"],
      y: ["Top", "Bottom"]
    };
    aliases = {
      marginX: "mx",
      marginY: "my",
      paddingX: "px",
      paddingY: "py"
    };
    getCssProperties = memoize2((prop) => {
      if (prop.length > 2) {
        if (aliases[prop]) {
          prop = aliases[prop];
        } else {
          return [prop];
        }
      }
      const [a, b] = prop.split("");
      const property = properties[a];
      const direction = directions[b] || "";
      return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
    });
    marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
    paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
    spacingKeys = [...marginKeys, ...paddingKeys];
    margin.propTypes = true ? marginKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    margin.filterProps = marginKeys;
    padding.propTypes = true ? paddingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    padding.filterProps = paddingKeys;
    spacing.propTypes = true ? spacingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    spacing.filterProps = spacingKeys;
    spacing_default = spacing;
  }
});

// node_modules/@mui/system/spacing/index.js
var init_spacing2 = __esm({
  "node_modules/@mui/system/spacing/index.js"() {
    init_spacing();
    init_spacing();
  }
});

// node_modules/@mui/system/createTheme/createSpacing.js
function createSpacing(spacingInput = 8, transform = createUnarySpacing({
  spacing: spacingInput
})) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const spacing2 = (...argsInput) => {
    if (true) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}
var init_createSpacing = __esm({
  "node_modules/@mui/system/createTheme/createSpacing.js"() {
    init_spacing2();
  }
});

// node_modules/@mui/system/compose/compose.js
function compose(...styles) {
  const handlers = styles.reduce((acc, style4) => {
    style4.filterProps.forEach((prop) => {
      acc[prop] = style4;
    });
    return acc;
  }, {});
  const fn = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = true ? styles.reduce((acc, style4) => Object.assign(acc, style4.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style4) => acc.concat(style4.filterProps), []);
  return fn;
}
var compose_default;
var init_compose = __esm({
  "node_modules/@mui/system/compose/compose.js"() {
    init_merge2();
    compose_default = compose;
  }
});

// node_modules/@mui/system/compose/index.js
var init_compose2 = __esm({
  "node_modules/@mui/system/compose/index.js"() {
    init_compose();
  }
});

// node_modules/@mui/system/borders/borders.js
function borderTransform(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return style_default({
    prop,
    themeKey: "borders",
    transform
  });
}
var border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, outline, outlineColor, borderRadius, borders, borders_default;
var init_borders = __esm({
  "node_modules/@mui/system/borders/borders.js"() {
    init_responsivePropType2();
    init_style2();
    init_compose2();
    init_spacing2();
    init_breakpoints2();
    border = createBorderStyle("border", borderTransform);
    borderTop = createBorderStyle("borderTop", borderTransform);
    borderRight = createBorderStyle("borderRight", borderTransform);
    borderBottom = createBorderStyle("borderBottom", borderTransform);
    borderLeft = createBorderStyle("borderLeft", borderTransform);
    borderColor = createBorderStyle("borderColor");
    borderTopColor = createBorderStyle("borderTopColor");
    borderRightColor = createBorderStyle("borderRightColor");
    borderBottomColor = createBorderStyle("borderBottomColor");
    borderLeftColor = createBorderStyle("borderLeftColor");
    outline = createBorderStyle("outline", borderTransform);
    outlineColor = createBorderStyle("outlineColor");
    borderRadius = (props) => {
      if (props.borderRadius !== void 0 && props.borderRadius !== null) {
        const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
        const styleFromPropValue = (propValue) => ({
          borderRadius: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
      }
      return null;
    };
    borderRadius.propTypes = true ? {
      borderRadius: responsivePropType_default
    } : {};
    borderRadius.filterProps = ["borderRadius"];
    borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);
    borders_default = borders;
  }
});

// node_modules/@mui/system/borders/index.js
var init_borders2 = __esm({
  "node_modules/@mui/system/borders/index.js"() {
    init_borders();
    init_borders();
  }
});

// node_modules/@mui/system/cssGrid/cssGrid.js
var gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea, grid, cssGrid_default;
var init_cssGrid = __esm({
  "node_modules/@mui/system/cssGrid/cssGrid.js"() {
    init_style2();
    init_compose2();
    init_spacing2();
    init_breakpoints2();
    init_responsivePropType2();
    gap = (props) => {
      if (props.gap !== void 0 && props.gap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
        const styleFromPropValue = (propValue) => ({
          gap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.gap, styleFromPropValue);
      }
      return null;
    };
    gap.propTypes = true ? {
      gap: responsivePropType_default
    } : {};
    gap.filterProps = ["gap"];
    columnGap = (props) => {
      if (props.columnGap !== void 0 && props.columnGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
        const styleFromPropValue = (propValue) => ({
          columnGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.columnGap, styleFromPropValue);
      }
      return null;
    };
    columnGap.propTypes = true ? {
      columnGap: responsivePropType_default
    } : {};
    columnGap.filterProps = ["columnGap"];
    rowGap = (props) => {
      if (props.rowGap !== void 0 && props.rowGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
        const styleFromPropValue = (propValue) => ({
          rowGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.rowGap, styleFromPropValue);
      }
      return null;
    };
    rowGap.propTypes = true ? {
      rowGap: responsivePropType_default
    } : {};
    rowGap.filterProps = ["rowGap"];
    gridColumn = style_default({
      prop: "gridColumn"
    });
    gridRow = style_default({
      prop: "gridRow"
    });
    gridAutoFlow = style_default({
      prop: "gridAutoFlow"
    });
    gridAutoColumns = style_default({
      prop: "gridAutoColumns"
    });
    gridAutoRows = style_default({
      prop: "gridAutoRows"
    });
    gridTemplateColumns = style_default({
      prop: "gridTemplateColumns"
    });
    gridTemplateRows = style_default({
      prop: "gridTemplateRows"
    });
    gridTemplateAreas = style_default({
      prop: "gridTemplateAreas"
    });
    gridArea = style_default({
      prop: "gridArea"
    });
    grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
    cssGrid_default = grid;
  }
});

// node_modules/@mui/system/cssGrid/index.js
var init_cssGrid2 = __esm({
  "node_modules/@mui/system/cssGrid/index.js"() {
    init_cssGrid();
    init_cssGrid();
  }
});

// node_modules/@mui/system/palette/palette.js
function paletteTransform(value, userValue) {
  if (userValue === "grey") {
    return userValue;
  }
  return value;
}
var color, bgcolor, backgroundColor, palette, palette_default;
var init_palette = __esm({
  "node_modules/@mui/system/palette/palette.js"() {
    init_style2();
    init_compose2();
    color = style_default({
      prop: "color",
      themeKey: "palette",
      transform: paletteTransform
    });
    bgcolor = style_default({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    });
    backgroundColor = style_default({
      prop: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    });
    palette = compose_default(color, bgcolor, backgroundColor);
    palette_default = palette;
  }
});

// node_modules/@mui/system/palette/index.js
var init_palette2 = __esm({
  "node_modules/@mui/system/palette/index.js"() {
    init_palette();
    init_palette();
  }
});

// node_modules/@mui/system/sizing/sizing.js
function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width, maxWidth, minWidth, height, maxHeight, minHeight, sizeWidth, sizeHeight, boxSizing, sizing, sizing_default;
var init_sizing = __esm({
  "node_modules/@mui/system/sizing/sizing.js"() {
    init_style2();
    init_compose2();
    init_breakpoints2();
    width = style_default({
      prop: "width",
      transform: sizingTransform
    });
    maxWidth = (props) => {
      if (props.maxWidth !== void 0 && props.maxWidth !== null) {
        const styleFromPropValue = (propValue) => {
          var _a, _b, _c, _d, _e;
          const breakpoint = ((_c = (_b = (_a = props.theme) == null ? void 0 : _a.breakpoints) == null ? void 0 : _b.values) == null ? void 0 : _c[propValue]) || values[propValue];
          if (!breakpoint) {
            return {
              maxWidth: sizingTransform(propValue)
            };
          }
          if (((_e = (_d = props.theme) == null ? void 0 : _d.breakpoints) == null ? void 0 : _e.unit) !== "px") {
            return {
              maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
            };
          }
          return {
            maxWidth: breakpoint
          };
        };
        return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
      }
      return null;
    };
    maxWidth.filterProps = ["maxWidth"];
    minWidth = style_default({
      prop: "minWidth",
      transform: sizingTransform
    });
    height = style_default({
      prop: "height",
      transform: sizingTransform
    });
    maxHeight = style_default({
      prop: "maxHeight",
      transform: sizingTransform
    });
    minHeight = style_default({
      prop: "minHeight",
      transform: sizingTransform
    });
    sizeWidth = style_default({
      prop: "size",
      cssProperty: "width",
      transform: sizingTransform
    });
    sizeHeight = style_default({
      prop: "size",
      cssProperty: "height",
      transform: sizingTransform
    });
    boxSizing = style_default({
      prop: "boxSizing"
    });
    sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
    sizing_default = sizing;
  }
});

// node_modules/@mui/system/sizing/index.js
var init_sizing2 = __esm({
  "node_modules/@mui/system/sizing/index.js"() {
    init_sizing();
    init_sizing();
  }
});

// node_modules/@mui/system/styleFunctionSx/defaultSxConfig.js
var defaultSxConfig, defaultSxConfig_default;
var init_defaultSxConfig = __esm({
  "node_modules/@mui/system/styleFunctionSx/defaultSxConfig.js"() {
    init_spacing2();
    init_borders2();
    init_cssGrid2();
    init_palette2();
    init_sizing2();
    defaultSxConfig = {
      // borders
      border: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderTop: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderRight: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderBottom: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderLeft: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderColor: {
        themeKey: "palette"
      },
      borderTopColor: {
        themeKey: "palette"
      },
      borderRightColor: {
        themeKey: "palette"
      },
      borderBottomColor: {
        themeKey: "palette"
      },
      borderLeftColor: {
        themeKey: "palette"
      },
      outline: {
        themeKey: "borders",
        transform: borderTransform
      },
      outlineColor: {
        themeKey: "palette"
      },
      borderRadius: {
        themeKey: "shape.borderRadius",
        style: borderRadius
      },
      // palette
      color: {
        themeKey: "palette",
        transform: paletteTransform
      },
      bgcolor: {
        themeKey: "palette",
        cssProperty: "backgroundColor",
        transform: paletteTransform
      },
      backgroundColor: {
        themeKey: "palette",
        transform: paletteTransform
      },
      // spacing
      p: {
        style: padding
      },
      pt: {
        style: padding
      },
      pr: {
        style: padding
      },
      pb: {
        style: padding
      },
      pl: {
        style: padding
      },
      px: {
        style: padding
      },
      py: {
        style: padding
      },
      padding: {
        style: padding
      },
      paddingTop: {
        style: padding
      },
      paddingRight: {
        style: padding
      },
      paddingBottom: {
        style: padding
      },
      paddingLeft: {
        style: padding
      },
      paddingX: {
        style: padding
      },
      paddingY: {
        style: padding
      },
      paddingInline: {
        style: padding
      },
      paddingInlineStart: {
        style: padding
      },
      paddingInlineEnd: {
        style: padding
      },
      paddingBlock: {
        style: padding
      },
      paddingBlockStart: {
        style: padding
      },
      paddingBlockEnd: {
        style: padding
      },
      m: {
        style: margin
      },
      mt: {
        style: margin
      },
      mr: {
        style: margin
      },
      mb: {
        style: margin
      },
      ml: {
        style: margin
      },
      mx: {
        style: margin
      },
      my: {
        style: margin
      },
      margin: {
        style: margin
      },
      marginTop: {
        style: margin
      },
      marginRight: {
        style: margin
      },
      marginBottom: {
        style: margin
      },
      marginLeft: {
        style: margin
      },
      marginX: {
        style: margin
      },
      marginY: {
        style: margin
      },
      marginInline: {
        style: margin
      },
      marginInlineStart: {
        style: margin
      },
      marginInlineEnd: {
        style: margin
      },
      marginBlock: {
        style: margin
      },
      marginBlockStart: {
        style: margin
      },
      marginBlockEnd: {
        style: margin
      },
      // display
      displayPrint: {
        cssProperty: false,
        transform: (value) => ({
          "@media print": {
            display: value
          }
        })
      },
      display: {},
      overflow: {},
      textOverflow: {},
      visibility: {},
      whiteSpace: {},
      // flexbox
      flexBasis: {},
      flexDirection: {},
      flexWrap: {},
      justifyContent: {},
      alignItems: {},
      alignContent: {},
      order: {},
      flex: {},
      flexGrow: {},
      flexShrink: {},
      alignSelf: {},
      justifyItems: {},
      justifySelf: {},
      // grid
      gap: {
        style: gap
      },
      rowGap: {
        style: rowGap
      },
      columnGap: {
        style: columnGap
      },
      gridColumn: {},
      gridRow: {},
      gridAutoFlow: {},
      gridAutoColumns: {},
      gridAutoRows: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {},
      gridArea: {},
      // positions
      position: {},
      zIndex: {
        themeKey: "zIndex"
      },
      top: {},
      right: {},
      bottom: {},
      left: {},
      // shadows
      boxShadow: {
        themeKey: "shadows"
      },
      // sizing
      width: {
        transform: sizingTransform
      },
      maxWidth: {
        style: maxWidth
      },
      minWidth: {
        transform: sizingTransform
      },
      height: {
        transform: sizingTransform
      },
      maxHeight: {
        transform: sizingTransform
      },
      minHeight: {
        transform: sizingTransform
      },
      boxSizing: {},
      // typography
      font: {
        themeKey: "font"
      },
      fontFamily: {
        themeKey: "typography"
      },
      fontSize: {
        themeKey: "typography"
      },
      fontStyle: {
        themeKey: "typography"
      },
      fontWeight: {
        themeKey: "typography"
      },
      letterSpacing: {},
      textTransform: {},
      lineHeight: {},
      textAlign: {},
      typography: {
        cssProperty: false,
        themeKey: "typography"
      }
    };
    defaultSxConfig_default = defaultSxConfig;
  }
});

// node_modules/@mui/system/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg2) {
  return typeof maybeFn === "function" ? maybeFn(arg2) : maybeFn;
}
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme
    };
    const options = config[prop];
    if (!options) {
      return {
        [prop]: val
      };
    }
    const {
      cssProperty = prop,
      themeKey,
      transform,
      style: style4
    } = options;
    if (val == null) {
      return null;
    }
    if (themeKey === "typography" && val === "inherit") {
      return {
        [prop]: val
      };
    }
    const themeMapping = getPath(theme, themeKey) || {};
    if (style4) {
      return style4(props);
    }
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx2(props) {
    const {
      sx,
      theme = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    const config = theme.unstable_sxConfig ?? defaultSxConfig_default;
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css2 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (config[styleKey]) {
              css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css2[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css2 = merge_default(css2, breakpointsValues);
              }
            }
          } else {
            css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
          }
        }
      });
      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css2));
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
var styleFunctionSx, styleFunctionSx_default;
var init_styleFunctionSx = __esm({
  "node_modules/@mui/system/styleFunctionSx/styleFunctionSx.js"() {
    init_capitalize2();
    init_merge2();
    init_style2();
    init_breakpoints2();
    init_cssContainerQueries2();
    init_defaultSxConfig();
    styleFunctionSx = unstable_createStyleFunctionSx();
    styleFunctionSx.filterProps = ["sx"];
    styleFunctionSx_default = styleFunctionSx;
  }
});

// node_modules/@mui/system/createTheme/applyStyles.js
function applyStyles(key, styles) {
  var _a;
  const theme = this;
  if (theme.vars) {
    if (!((_a = theme.colorSchemes) == null ? void 0 : _a[key]) || typeof theme.getColorSchemeSelector !== "function") {
      return {};
    }
    let selector = theme.getColorSchemeSelector(key);
    if (selector === "&") {
      return styles;
    }
    if (selector.includes("data-") || selector.includes(".")) {
      selector = `*:where(${selector.replace(/\s*&$/, "")}) &`;
    }
    return {
      [selector]: styles
    };
  }
  if (theme.palette.mode === key) {
    return styles;
  }
  return {};
}
var init_applyStyles = __esm({
  "node_modules/@mui/system/createTheme/applyStyles.js"() {
  }
});

// node_modules/@mui/system/createTheme/createTheme.js
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {},
    ...other
  } = options;
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...paletteInput
    },
    spacing: spacing2,
    shape: {
      ...shape_default,
      ...shapeInput
    }
  }, other);
  muiTheme = cssContainerQueries(muiTheme);
  muiTheme.applyStyles = applyStyles;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = {
    ...defaultSxConfig_default,
    ...other == null ? void 0 : other.unstable_sxConfig
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
var createTheme_default;
var init_createTheme = __esm({
  "node_modules/@mui/system/createTheme/createTheme.js"() {
    init_deepmerge2();
    init_createBreakpoints();
    init_cssContainerQueries2();
    init_shape();
    init_createSpacing();
    init_styleFunctionSx();
    init_defaultSxConfig();
    init_applyStyles();
    createTheme_default = createTheme;
  }
});

// node_modules/@mui/system/createTheme/index.js
var init_createTheme2 = __esm({
  "node_modules/@mui/system/createTheme/index.js"() {
    init_createTheme();
    init_createBreakpoints();
    init_applyStyles();
  }
});

// node_modules/@mui/system/useThemeWithoutDefault/useThemeWithoutDefault.js
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme2(defaultTheme5 = null) {
  const contextTheme = React18.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme5 : contextTheme;
}
var React18, useThemeWithoutDefault_default;
var init_useThemeWithoutDefault = __esm({
  "node_modules/@mui/system/useThemeWithoutDefault/useThemeWithoutDefault.js"() {
    "use client";
    React18 = __toESM(require_react());
    init_styled_engine();
    useThemeWithoutDefault_default = useTheme2;
  }
});

// node_modules/@mui/system/useThemeWithoutDefault/index.js
var init_useThemeWithoutDefault2 = __esm({
  "node_modules/@mui/system/useThemeWithoutDefault/index.js"() {
    init_useThemeWithoutDefault();
  }
});

// node_modules/@mui/system/useTheme/useTheme.js
function useTheme3(defaultTheme5 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme5);
}
var systemDefaultTheme, useTheme_default;
var init_useTheme = __esm({
  "node_modules/@mui/system/useTheme/useTheme.js"() {
    "use client";
    init_createTheme2();
    init_useThemeWithoutDefault2();
    systemDefaultTheme = createTheme_default();
    useTheme_default = useTheme3;
  }
});

// node_modules/@mui/system/useTheme/index.js
var init_useTheme2 = __esm({
  "node_modules/@mui/system/useTheme/index.js"() {
    init_useTheme();
    init_useTheme();
  }
});

// node_modules/@mui/system/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme5,
  themeId
}) {
  let theme = useTheme_default(defaultTheme5);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  return getThemeProps({
    theme,
    name,
    props
  });
}
var init_useThemeProps = __esm({
  "node_modules/@mui/system/useThemeProps/useThemeProps.js"() {
    "use client";
    init_getThemeProps();
    init_useTheme2();
  }
});

// node_modules/@mui/system/useThemeProps/index.js
var init_useThemeProps2 = __esm({
  "node_modules/@mui/system/useThemeProps/index.js"() {
    init_useThemeProps();
    init_getThemeProps();
  }
});

// node_modules/@mui/system/useMediaQuery/useMediaQuery.js
function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
  const [match2, setMatch] = React19.useState(() => {
    if (noSsr && matchMedia) {
      return matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }
    return defaultMatches;
  });
  useEnhancedEffect_default(() => {
    if (!matchMedia) {
      return void 0;
    }
    const queryList = matchMedia(query);
    const updateMatch = () => {
      setMatch(queryList.matches);
    };
    updateMatch();
    queryList.addEventListener("change", updateMatch);
    return () => {
      queryList.removeEventListener("change", updateMatch);
    };
  }, [query, matchMedia]);
  return match2;
}
function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
  const getDefaultSnapshot = React19.useCallback(() => defaultMatches, [defaultMatches]);
  const getServerSnapshot = React19.useMemo(() => {
    if (noSsr && matchMedia) {
      return () => matchMedia(query).matches;
    }
    if (ssrMatchMedia !== null) {
      const {
        matches
      } = ssrMatchMedia(query);
      return () => matches;
    }
    return getDefaultSnapshot;
  }, [getDefaultSnapshot, query, ssrMatchMedia, noSsr, matchMedia]);
  const [getSnapshot, subscribe] = React19.useMemo(() => {
    if (matchMedia === null) {
      return [getDefaultSnapshot, () => () => {
      }];
    }
    const mediaQueryList = matchMedia(query);
    return [() => mediaQueryList.matches, (notify) => {
      mediaQueryList.addEventListener("change", notify);
      return () => {
        mediaQueryList.removeEventListener("change", notify);
      };
    }];
  }, [getDefaultSnapshot, matchMedia, query]);
  const match2 = maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return match2;
}
function useMediaQuery(queryInput, options = {}) {
  const theme = useThemeWithoutDefault_default();
  const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    ssrMatchMedia = null,
    noSsr = false
  } = getThemeProps({
    name: "MuiUseMediaQuery",
    props: options,
    theme
  });
  if (true) {
    if (typeof queryInput === "function" && theme === null) {
      console.error(["MUI: The `query` argument provided is invalid.", "You are providing a function without a theme in the context.", "One of the parent elements needs to use a ThemeProvider."].join("\n"));
    }
  }
  let query = typeof queryInput === "function" ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, "");
  const useMediaQueryImplementation = maybeReactUseSyncExternalStore !== void 0 ? useMediaQueryNew : useMediaQueryOld;
  const match2 = useMediaQueryImplementation(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
  if (true) {
    React19.useDebugValue({
      query,
      match: match2
    });
  }
  return match2;
}
var React19, safeReact2, maybeReactUseSyncExternalStore;
var init_useMediaQuery = __esm({
  "node_modules/@mui/system/useMediaQuery/useMediaQuery.js"() {
    "use client";
    React19 = __toESM(require_react());
    init_useEnhancedEffect2();
    init_useThemeProps2();
    init_useThemeWithoutDefault2();
    safeReact2 = {
      ...React19
    };
    maybeReactUseSyncExternalStore = safeReact2.useSyncExternalStore;
  }
});

// node_modules/@mui/system/useMediaQuery/index.js
var init_useMediaQuery2 = __esm({
  "node_modules/@mui/system/useMediaQuery/index.js"() {
    init_useMediaQuery();
    init_useMediaQuery();
  }
});

// node_modules/@mui/system/colorManipulator/colorManipulator.js
function clampWrapper(value, min = 0, max = 1) {
  if (true) {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return clamp_default(value, min, max);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(type)) {
    throw new Error(true ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color2));
  }
  let values2 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values2 = values2.split(" ");
    colorSpace = values2.shift();
    if (values2.length === 4 && values2[3].charAt(0) === "/") {
      values2[3] = values2[3].slice(1);
    }
    if (!["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(colorSpace)) {
      throw new Error(true ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values2 = values2.split(",");
  }
  values2 = values2.map((value) => parseFloat(value));
  return {
    type,
    values: values2,
    colorSpace
  };
}
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values2
  } = color2;
  if (type.includes("rgb")) {
    values2 = values2.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.includes("hsl")) {
    values2[1] = `${values2[1]}%`;
    values2[2] = `${values2[2]}%`;
  }
  if (type.includes("color")) {
    values2 = `${colorSpace} ${values2.join(" ")}`;
  } else {
    values2 = `${values2.join(", ")}`;
  }
  return `${type}(${values2})`;
}
function rgbToHex(color2) {
  if (color2.startsWith("#")) {
    return color2;
  }
  const {
    values: values2
  } = decomposeColor(color2);
  return `#${values2.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join("")}`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values2
  } = color2;
  const h = values2[0];
  const s = values2[1] / 100;
  const l = values2[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values2[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" || color2.type === "hsla" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clampWrapper(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
function private_safeAlpha(color2, value, warning) {
  try {
    return alpha(color2, value);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.includes("hsl")) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.includes("rgb") || color2.type.includes("color")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeDarken(color2, coefficient, warning) {
  try {
    return darken(color2, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.includes("hsl")) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.includes("rgb")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (255 - color2.values[i]) * coefficient;
    }
  } else if (color2.type.includes("color")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (1 - color2.values[i]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeLighten(color2, coefficient, warning) {
  try {
    return lighten(color2, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
function emphasize(color2, coefficient = 0.15) {
  return getLuminance(color2) > 0.5 ? darken(color2, coefficient) : lighten(color2, coefficient);
}
function private_safeEmphasize(color2, coefficient, warning) {
  try {
    return emphasize(color2, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
var colorChannel, private_safeColorChannel;
var init_colorManipulator = __esm({
  "node_modules/@mui/system/colorManipulator/colorManipulator.js"() {
    init_formatMuiErrorMessage2();
    init_clamp2();
    colorChannel = (color2) => {
      const decomposedColor = decomposeColor(color2);
      return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.includes("hsl") && idx !== 0 ? `${val}%` : val).join(" ");
    };
    private_safeColorChannel = (color2, warning) => {
      try {
        return colorChannel(color2);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color2;
      }
    };
  }
});

// node_modules/@mui/system/GlobalStyles/GlobalStyles.js
function GlobalStyles2({
  styles,
  themeId,
  defaultTheme: defaultTheme5 = {}
}) {
  const upperTheme = useTheme_default(defaultTheme5);
  const globalStyles = typeof styles === "function" ? styles(themeId ? upperTheme[themeId] || upperTheme : upperTheme) : styles;
  return (0, import_jsx_runtime3.jsx)(GlobalStyles, {
    styles: globalStyles
  });
}
var React20, import_prop_types8, import_jsx_runtime3, GlobalStyles_default;
var init_GlobalStyles3 = __esm({
  "node_modules/@mui/system/GlobalStyles/GlobalStyles.js"() {
    "use client";
    React20 = __toESM(require_react());
    import_prop_types8 = __toESM(require_prop_types());
    init_styled_engine();
    init_useTheme2();
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    true ? GlobalStyles2.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      defaultTheme: import_prop_types8.default.object,
      /**
       * @ignore
       */
      styles: import_prop_types8.default.oneOfType([import_prop_types8.default.array, import_prop_types8.default.func, import_prop_types8.default.number, import_prop_types8.default.object, import_prop_types8.default.string, import_prop_types8.default.bool]),
      /**
       * @ignore
       */
      themeId: import_prop_types8.default.string
    } : void 0;
    GlobalStyles_default = GlobalStyles2;
  }
});

// node_modules/@mui/system/GlobalStyles/index.js
var init_GlobalStyles4 = __esm({
  "node_modules/@mui/system/GlobalStyles/index.js"() {
    init_GlobalStyles3();
    init_GlobalStyles3();
  }
});

// node_modules/@mui/system/display/display.js
var displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace, display_default;
var init_display = __esm({
  "node_modules/@mui/system/display/display.js"() {
    init_style2();
    init_compose2();
    displayPrint = style_default({
      prop: "displayPrint",
      cssProperty: false,
      transform: (value) => ({
        "@media print": {
          display: value
        }
      })
    });
    displayRaw = style_default({
      prop: "display"
    });
    overflow = style_default({
      prop: "overflow"
    });
    textOverflow = style_default({
      prop: "textOverflow"
    });
    visibility = style_default({
      prop: "visibility"
    });
    whiteSpace = style_default({
      prop: "whiteSpace"
    });
    display_default = compose_default(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);
  }
});

// node_modules/@mui/system/display/index.js
var init_display2 = __esm({
  "node_modules/@mui/system/display/index.js"() {
    init_display();
    init_display();
  }
});

// node_modules/@mui/system/flexbox/flexbox.js
var flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf, flexbox, flexbox_default;
var init_flexbox = __esm({
  "node_modules/@mui/system/flexbox/flexbox.js"() {
    init_style2();
    init_compose2();
    flexBasis = style_default({
      prop: "flexBasis"
    });
    flexDirection = style_default({
      prop: "flexDirection"
    });
    flexWrap = style_default({
      prop: "flexWrap"
    });
    justifyContent = style_default({
      prop: "justifyContent"
    });
    alignItems = style_default({
      prop: "alignItems"
    });
    alignContent = style_default({
      prop: "alignContent"
    });
    order = style_default({
      prop: "order"
    });
    flex = style_default({
      prop: "flex"
    });
    flexGrow = style_default({
      prop: "flexGrow"
    });
    flexShrink = style_default({
      prop: "flexShrink"
    });
    alignSelf = style_default({
      prop: "alignSelf"
    });
    justifyItems = style_default({
      prop: "justifyItems"
    });
    justifySelf = style_default({
      prop: "justifySelf"
    });
    flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
    flexbox_default = flexbox;
  }
});

// node_modules/@mui/system/flexbox/index.js
var init_flexbox2 = __esm({
  "node_modules/@mui/system/flexbox/index.js"() {
    init_flexbox();
    init_flexbox();
  }
});

// node_modules/@mui/system/positions/positions.js
var position2, zIndex, top, right, bottom, left, positions_default;
var init_positions = __esm({
  "node_modules/@mui/system/positions/positions.js"() {
    init_style2();
    init_compose2();
    position2 = style_default({
      prop: "position"
    });
    zIndex = style_default({
      prop: "zIndex",
      themeKey: "zIndex"
    });
    top = style_default({
      prop: "top"
    });
    right = style_default({
      prop: "right"
    });
    bottom = style_default({
      prop: "bottom"
    });
    left = style_default({
      prop: "left"
    });
    positions_default = compose_default(position2, zIndex, top, right, bottom, left);
  }
});

// node_modules/@mui/system/positions/index.js
var init_positions2 = __esm({
  "node_modules/@mui/system/positions/index.js"() {
    init_positions();
    init_positions();
  }
});

// node_modules/@mui/system/shadows/shadows.js
var boxShadow, shadows_default;
var init_shadows = __esm({
  "node_modules/@mui/system/shadows/shadows.js"() {
    init_style2();
    boxShadow = style_default({
      prop: "boxShadow",
      themeKey: "shadows"
    });
    shadows_default = boxShadow;
  }
});

// node_modules/@mui/system/shadows/index.js
var init_shadows2 = __esm({
  "node_modules/@mui/system/shadows/index.js"() {
    init_shadows();
  }
});

// node_modules/@mui/system/typography/typography.js
var fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, textTransform, lineHeight, textAlign, typographyVariant, typography, typography_default;
var init_typography = __esm({
  "node_modules/@mui/system/typography/typography.js"() {
    init_style2();
    init_compose2();
    fontFamily = style_default({
      prop: "fontFamily",
      themeKey: "typography"
    });
    fontSize = style_default({
      prop: "fontSize",
      themeKey: "typography"
    });
    fontStyle = style_default({
      prop: "fontStyle",
      themeKey: "typography"
    });
    fontWeight = style_default({
      prop: "fontWeight",
      themeKey: "typography"
    });
    letterSpacing = style_default({
      prop: "letterSpacing"
    });
    textTransform = style_default({
      prop: "textTransform"
    });
    lineHeight = style_default({
      prop: "lineHeight"
    });
    textAlign = style_default({
      prop: "textAlign"
    });
    typographyVariant = style_default({
      prop: "typography",
      cssProperty: false,
      themeKey: "typography"
    });
    typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
    typography_default = typography;
  }
});

// node_modules/@mui/system/typography/index.js
var init_typography2 = __esm({
  "node_modules/@mui/system/typography/index.js"() {
    init_typography();
    init_typography();
  }
});

// node_modules/@mui/system/styleFunctionSx/extendSxProp.js
function extendSxProp(props) {
  const {
    sx: inSx,
    ...other
  } = props;
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return {
        ...systemProps,
        ...result
      };
    };
  } else {
    finalSx = {
      ...systemProps,
      ...inSx
    };
  }
  return {
    ...otherProps,
    sx: finalSx
  };
}
var splitProps;
var init_extendSxProp = __esm({
  "node_modules/@mui/system/styleFunctionSx/extendSxProp.js"() {
    init_deepmerge2();
    init_defaultSxConfig();
    splitProps = (props) => {
      var _a;
      const result = {
        systemProps: {},
        otherProps: {}
      };
      const config = ((_a = props == null ? void 0 : props.theme) == null ? void 0 : _a.unstable_sxConfig) ?? defaultSxConfig_default;
      Object.keys(props).forEach((prop) => {
        if (config[prop]) {
          result.systemProps[prop] = props[prop];
        } else {
          result.otherProps[prop] = props[prop];
        }
      });
      return result;
    };
  }
});

// node_modules/@mui/system/styleFunctionSx/index.js
var init_styleFunctionSx2 = __esm({
  "node_modules/@mui/system/styleFunctionSx/index.js"() {
    init_styleFunctionSx();
    init_styleFunctionSx();
    init_extendSxProp();
    init_defaultSxConfig();
  }
});

// node_modules/@mui/system/getThemeValue/getThemeValue.js
var filterPropsMapping, styleFunctionMapping, propToStyleFunction;
var init_getThemeValue = __esm({
  "node_modules/@mui/system/getThemeValue/getThemeValue.js"() {
    init_borders2();
    init_display2();
    init_flexbox2();
    init_cssGrid2();
    init_positions2();
    init_palette2();
    init_shadows2();
    init_sizing2();
    init_spacing2();
    init_typography2();
    filterPropsMapping = {
      borders: borders_default.filterProps,
      display: display_default.filterProps,
      flexbox: flexbox_default.filterProps,
      grid: cssGrid_default.filterProps,
      positions: positions_default.filterProps,
      palette: palette_default.filterProps,
      shadows: shadows_default.filterProps,
      sizing: sizing_default.filterProps,
      spacing: spacing_default.filterProps,
      typography: typography_default.filterProps
    };
    styleFunctionMapping = {
      borders: borders_default,
      display: display_default,
      flexbox: flexbox_default,
      grid: cssGrid_default,
      positions: positions_default,
      palette: palette_default,
      shadows: shadows_default,
      sizing: sizing_default,
      spacing: spacing_default,
      typography: typography_default
    };
    propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
      filterPropsMapping[styleFnName].forEach((propName) => {
        acc[propName] = styleFunctionMapping[styleFnName];
      });
      return acc;
    }, {});
  }
});

// node_modules/@mui/system/getThemeValue/index.js
var init_getThemeValue2 = __esm({
  "node_modules/@mui/system/getThemeValue/index.js"() {
    init_getThemeValue();
    init_getThemeValue();
  }
});

// node_modules/@mui/system/createBox/createBox.js
function createBox(options = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme5,
    defaultClassName = "MuiBox-root",
    generateClassName
  } = options;
  const BoxRoot = styled("div", {
    shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as"
  })(styleFunctionSx_default);
  const Box2 = React21.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme_default(defaultTheme5);
    const {
      className,
      component = "div",
      ...other
    } = extendSxProp(inProps);
    return (0, import_jsx_runtime4.jsx)(BoxRoot, {
      as: component,
      ref,
      className: clsx_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme,
      ...other
    });
  });
  return Box2;
}
var React21, import_jsx_runtime4;
var init_createBox = __esm({
  "node_modules/@mui/system/createBox/createBox.js"() {
    "use client";
    React21 = __toESM(require_react());
    init_clsx();
    init_styled_engine();
    init_styleFunctionSx2();
    init_useTheme2();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/system/createBox/index.js
var init_createBox2 = __esm({
  "node_modules/@mui/system/createBox/index.js"() {
    init_createBox();
  }
});

// node_modules/@mui/system/Box/boxClasses.js
var boxClasses, boxClasses_default;
var init_boxClasses = __esm({
  "node_modules/@mui/system/Box/boxClasses.js"() {
    init_generateUtilityClasses2();
    boxClasses = generateUtilityClasses("MuiBox", ["root"]);
    boxClasses_default = boxClasses;
  }
});

// node_modules/@mui/system/Box/Box.js
var import_prop_types9, Box;
var init_Box = __esm({
  "node_modules/@mui/system/Box/Box.js"() {
    "use client";
    import_prop_types9 = __toESM(require_prop_types());
    init_ClassNameGenerator2();
    init_createBox2();
    init_boxClasses();
    Box = createBox({
      defaultClassName: boxClasses_default.root,
      generateClassName: ClassNameGenerator_default.generate
    });
    true ? Box.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types9.default.node,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types9.default.elementType,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/Box/index.js
var init_Box2 = __esm({
  "node_modules/@mui/system/Box/index.js"() {
    init_Box();
    init_boxClasses();
    init_boxClasses();
  }
});

// node_modules/@mui/system/createStyled/createStyled.js
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
function resolveTheme(themeId, theme, defaultTheme5) {
  return isObjectEmpty2(theme) ? defaultTheme5 : theme[themeId] || theme;
}
function attachTheme(props, themeId, defaultTheme5) {
  if (PROCESSED_PROPS in props) {
    return props[PROCESSED_PROPS];
  }
  const processedProps = {
    ...props,
    theme: resolveTheme(themeId, props.theme, defaultTheme5)
  };
  props[PROCESSED_PROPS] = processedProps;
  processedProps[PROCESSED_PROPS] = processedProps;
  return processedProps;
}
function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (_props, styles) => styles[slot];
}
function processStyle(style4, props) {
  var _a;
  const resolvedStyle = typeof style4 === "function" ? style4(props) : style4;
  if (Array.isArray(resolvedStyle)) {
    return resolvedStyle.flatMap((subStyle) => processStyle(subStyle, props));
  }
  if (Array.isArray(resolvedStyle == null ? void 0 : resolvedStyle.variants)) {
    const {
      variants,
      ...otherStyles
    } = resolvedStyle;
    let result = otherStyles;
    let mergedState;
    variantLoop: for (let i = 0; i < variants.length; i += 1) {
      const variant = variants[i];
      if (typeof variant.props === "function") {
        mergedState ?? (mergedState = {
          ...props,
          ...props.ownerState,
          ownerState: props.ownerState
        });
        if (!variant.props(mergedState)) {
          continue;
        }
      } else {
        for (const key in variant.props) {
          if (props[key] !== variant.props[key] && ((_a = props.ownerState) == null ? void 0 : _a[key]) !== variant.props[key]) {
            continue variantLoop;
          }
        }
      }
      if (!Array.isArray(result)) {
        result = [result];
      }
      if (typeof variant.style === "function") {
        mergedState ?? (mergedState = {
          ...props,
          ...props.ownerState,
          ownerState: props.ownerState
        });
        result.push(variant.style(mergedState));
      } else {
        result.push(variant.style);
      }
    }
    return result;
  }
  return resolvedStyle;
}
function createStyled3(input = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme5 = systemDefaultTheme2,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp
  } = input;
  const systemSx = (props) => {
    return styleFunctionSx_default(attachTheme(props, themeId, defaultTheme5));
  };
  systemSx.__mui_systemSx = true;
  const styled4 = (tag, inputOptions = {}) => {
    internal_processStyles(tag, (styles) => styles.filter((style4) => !(style4 == null ? void 0 : style4.__mui_systemSx)));
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
      ...options
    } = inputOptions;
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      componentSlot && componentSlot !== "Root" && componentSlot !== "root" || false
    );
    const skipSx = inputSkipSx || false;
    let label;
    if (true) {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
      }
    }
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root" || componentSlot === "root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp2;
    } else if (isStringTag(tag)) {
      shouldForwardPropOption = void 0;
    }
    const defaultStyledResolver = styled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label,
      ...options
    });
    const transformStyleArg = (style4) => {
      if (typeof style4 === "function" && style4.__emotion_real !== style4 || isPlainObject(style4)) {
        return (props) => processStyle(style4, attachTheme(props, themeId, defaultTheme5));
      }
      return style4;
    };
    const muiStyledResolver = (style4, ...expressions) => {
      let transformedStyle = transformStyleArg(style4);
      const expressionsWithDefaultTheme = expressions ? expressions.map(transformStyleArg) : [];
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = resolveTheme(themeId, props.theme, defaultTheme5);
          if (!theme.components || !theme.components[componentName] || !theme.components[componentName].styleOverrides) {
            return null;
          }
          const styleOverrides = theme.components[componentName].styleOverrides;
          const resolvedStyleOverrides = {};
          const propsWithTheme = attachTheme(props, themeId, defaultTheme5);
          for (const slotKey in styleOverrides) {
            resolvedStyleOverrides[slotKey] = processStyle(styleOverrides[slotKey], propsWithTheme);
          }
          return overridesResolver(props, resolvedStyleOverrides);
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          var _a, _b;
          const theme = resolveTheme(themeId, props.theme, defaultTheme5);
          const themeVariants = (_b = (_a = theme == null ? void 0 : theme.components) == null ? void 0 : _a[componentName]) == null ? void 0 : _b.variants;
          if (!themeVariants) {
            return null;
          }
          return processStyle({
            variants: themeVariants
          }, attachTheme(props, themeId, defaultTheme5));
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(style4) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyle = [...style4, ...placeholders];
        transformedStyle.raw = [...style4.raw, ...placeholders];
      }
      const Component = defaultStyledResolver(transformedStyle, ...expressionsWithDefaultTheme);
      if (true) {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${capitalize(componentSlot || "")}`;
        }
        if (displayName === void 0) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }
      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
  return styled4;
}
function isObjectEmpty2(object) {
  for (const _ in object) {
    return false;
  }
  return true;
}
function isStringTag(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96;
}
function lowercaseFirstLetter(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
}
var systemDefaultTheme2, PROCESSED_PROPS;
var init_createStyled = __esm({
  "node_modules/@mui/system/createStyled/createStyled.js"() {
    init_styled_engine();
    init_deepmerge2();
    init_capitalize2();
    init_getDisplayName2();
    init_createTheme2();
    init_styleFunctionSx2();
    systemDefaultTheme2 = createTheme_default();
    PROCESSED_PROPS = Symbol("mui.processed_props");
  }
});

// node_modules/@mui/system/createStyled/index.js
var init_createStyled2 = __esm({
  "node_modules/@mui/system/createStyled/index.js"() {
    init_createStyled();
    init_createStyled();
  }
});

// node_modules/@mui/system/styled/styled.js
var styled2, styled_default;
var init_styled = __esm({
  "node_modules/@mui/system/styled/styled.js"() {
    init_createStyled2();
    styled2 = createStyled3();
    styled_default = styled2;
  }
});

// node_modules/@mui/system/styled/index.js
var init_styled2 = __esm({
  "node_modules/@mui/system/styled/index.js"() {
    init_styled();
  }
});

// node_modules/@mui/system/colorManipulator/index.js
var init_colorManipulator2 = __esm({
  "node_modules/@mui/system/colorManipulator/index.js"() {
    init_colorManipulator();
  }
});

// node_modules/@mui/private-theming/useTheme/ThemeContext.js
var React22, ThemeContext2, ThemeContext_default;
var init_ThemeContext = __esm({
  "node_modules/@mui/private-theming/useTheme/ThemeContext.js"() {
    React22 = __toESM(require_react());
    ThemeContext2 = React22.createContext(null);
    if (true) {
      ThemeContext2.displayName = "ThemeContext";
    }
    ThemeContext_default = ThemeContext2;
  }
});

// node_modules/@mui/private-theming/useTheme/useTheme.js
function useTheme4() {
  const theme = React23.useContext(ThemeContext_default);
  if (true) {
    React23.useDebugValue(theme);
  }
  return theme;
}
var React23;
var init_useTheme3 = __esm({
  "node_modules/@mui/private-theming/useTheme/useTheme.js"() {
    React23 = __toESM(require_react());
    init_ThemeContext();
  }
});

// node_modules/@mui/private-theming/useTheme/index.js
var init_useTheme4 = __esm({
  "node_modules/@mui/private-theming/useTheme/index.js"() {
    init_useTheme3();
  }
});

// node_modules/@mui/private-theming/ThemeProvider/nested.js
var hasSymbol, nested_default;
var init_nested = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/nested.js"() {
    hasSymbol = typeof Symbol === "function" && Symbol.for;
    nested_default = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
  }
});

// node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    if (true) {
      if (!mergedTheme) {
        console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join("\n"));
      }
    }
    return mergedTheme;
  }
  return {
    ...outerTheme,
    ...localTheme
  };
}
function ThemeProvider2(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme4();
  if (true) {
    if (outerTheme === null && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const theme = React24.useMemo(() => {
    const output = outerTheme === null ? {
      ...localTheme
    } : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested_default] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return (0, import_jsx_runtime5.jsx)(ThemeContext_default.Provider, {
    value: theme,
    children
  });
}
var React24, import_prop_types10, import_jsx_runtime5, ThemeProvider_default;
var init_ThemeProvider = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js"() {
    React24 = __toESM(require_react());
    import_prop_types10 = __toESM(require_prop_types());
    init_esm();
    init_ThemeContext();
    init_useTheme4();
    init_nested();
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
    true ? ThemeProvider2.propTypes = {
      /**
       * Your component tree.
       */
      children: import_prop_types10.default.node,
      /**
       * A theme object. You can provide a function to extend the outer theme.
       */
      theme: import_prop_types10.default.oneOfType([import_prop_types10.default.object, import_prop_types10.default.func]).isRequired
    } : void 0;
    if (true) {
      true ? ThemeProvider2.propTypes = exactProp(ThemeProvider2.propTypes) : void 0;
    }
    ThemeProvider_default = ThemeProvider2;
  }
});

// node_modules/@mui/private-theming/ThemeProvider/index.js
var init_ThemeProvider2 = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/index.js"() {
    init_ThemeProvider();
    init_nested();
  }
});

// node_modules/@mui/private-theming/index.js
var init_private_theming = __esm({
  "node_modules/@mui/private-theming/index.js"() {
    init_ThemeProvider2();
    init_ThemeProvider2();
    init_useTheme4();
  }
});

// node_modules/@mui/system/RtlProvider/index.js
function RtlProvider({
  value,
  ...props
}) {
  return (0, import_jsx_runtime6.jsx)(RtlContext.Provider, {
    value: value ?? true,
    ...props
  });
}
var React25, import_prop_types11, import_jsx_runtime6, RtlContext, useRtl, RtlProvider_default;
var init_RtlProvider = __esm({
  "node_modules/@mui/system/RtlProvider/index.js"() {
    React25 = __toESM(require_react());
    import_prop_types11 = __toESM(require_prop_types());
    import_jsx_runtime6 = __toESM(require_jsx_runtime());
    RtlContext = React25.createContext();
    true ? RtlProvider.propTypes = {
      children: import_prop_types11.default.node,
      value: import_prop_types11.default.bool
    } : void 0;
    useRtl = () => {
      const value = React25.useContext(RtlContext);
      return value ?? false;
    };
    RtlProvider_default = RtlProvider;
  }
});

// node_modules/@mui/system/DefaultPropsProvider/DefaultPropsProvider.js
function DefaultPropsProvider({
  value,
  children
}) {
  return (0, import_jsx_runtime7.jsx)(PropsContext.Provider, {
    value,
    children
  });
}
function getThemeProps2(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name]) {
    return props;
  }
  const config = theme.components[name];
  if (config.defaultProps) {
    return resolveProps(config.defaultProps, props);
  }
  if (!config.styleOverrides && !config.variants) {
    return resolveProps(config, props);
  }
  return props;
}
function useDefaultProps({
  props,
  name
}) {
  const ctx = React26.useContext(PropsContext);
  return getThemeProps2({
    props,
    name,
    theme: {
      components: ctx
    }
  });
}
var React26, import_prop_types12, import_jsx_runtime7, PropsContext, DefaultPropsProvider_default;
var init_DefaultPropsProvider = __esm({
  "node_modules/@mui/system/DefaultPropsProvider/DefaultPropsProvider.js"() {
    "use client";
    React26 = __toESM(require_react());
    import_prop_types12 = __toESM(require_prop_types());
    init_resolveProps2();
    import_jsx_runtime7 = __toESM(require_jsx_runtime());
    PropsContext = React26.createContext(void 0);
    true ? DefaultPropsProvider.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types12.default.node,
      /**
       * @ignore
       */
      value: import_prop_types12.default.object
    } : void 0;
    DefaultPropsProvider_default = DefaultPropsProvider;
  }
});

// node_modules/@mui/system/DefaultPropsProvider/index.js
var init_DefaultPropsProvider2 = __esm({
  "node_modules/@mui/system/DefaultPropsProvider/index.js"() {
    init_DefaultPropsProvider();
  }
});

// node_modules/@mui/system/ThemeProvider/ThemeProvider.js
function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
  return React27.useMemo(() => {
    const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
    if (typeof localTheme === "function") {
      const mergedTheme = localTheme(resolvedTheme);
      const result = themeId ? {
        ...upperTheme,
        [themeId]: mergedTheme
      } : mergedTheme;
      if (isPrivate) {
        return () => result;
      }
      return result;
    }
    return themeId ? {
      ...upperTheme,
      [themeId]: localTheme
    } : {
      ...upperTheme,
      ...localTheme
    };
  }, [themeId, upperTheme, localTheme, isPrivate]);
}
function ThemeProvider3(props) {
  const {
    children,
    theme: localTheme,
    themeId
  } = props;
  const upperTheme = useThemeWithoutDefault_default(EMPTY_THEME);
  const upperPrivateTheme = useTheme4() || EMPTY_THEME;
  if (true) {
    if (upperTheme === null && typeof localTheme === "function" || themeId && upperTheme && !upperTheme[themeId] && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
  const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
  const rtlValue = engineTheme.direction === "rtl";
  return (0, import_jsx_runtime8.jsx)(ThemeProvider_default, {
    theme: privateTheme,
    children: (0, import_jsx_runtime8.jsx)(ThemeContext.Provider, {
      value: engineTheme,
      children: (0, import_jsx_runtime8.jsx)(RtlProvider_default, {
        value: rtlValue,
        children: (0, import_jsx_runtime8.jsx)(DefaultPropsProvider_default, {
          value: engineTheme == null ? void 0 : engineTheme.components,
          children
        })
      })
    })
  });
}
var React27, import_prop_types13, import_jsx_runtime8, EMPTY_THEME, ThemeProvider_default2;
var init_ThemeProvider3 = __esm({
  "node_modules/@mui/system/ThemeProvider/ThemeProvider.js"() {
    "use client";
    React27 = __toESM(require_react());
    import_prop_types13 = __toESM(require_prop_types());
    init_private_theming();
    init_exactProp2();
    init_styled_engine();
    init_useThemeWithoutDefault2();
    init_RtlProvider();
    init_DefaultPropsProvider2();
    import_jsx_runtime8 = __toESM(require_jsx_runtime());
    EMPTY_THEME = {};
    true ? ThemeProvider3.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * Your component tree.
       */
      children: import_prop_types13.default.node,
      /**
       * A theme object. You can provide a function to extend the outer theme.
       */
      theme: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object]).isRequired,
      /**
       * The design system's unique id for getting the corresponded theme when there are multiple design systems.
       */
      themeId: import_prop_types13.default.string
    } : void 0;
    if (true) {
      true ? ThemeProvider3.propTypes = exactProp(ThemeProvider3.propTypes) : void 0;
    }
    ThemeProvider_default2 = ThemeProvider3;
  }
});

// node_modules/@mui/system/ThemeProvider/index.js
var init_ThemeProvider4 = __esm({
  "node_modules/@mui/system/ThemeProvider/index.js"() {
    init_ThemeProvider3();
  }
});

// node_modules/@mui/system/InitColorSchemeScript/InitColorSchemeScript.js
function InitColorSchemeScript(options) {
  const {
    defaultLightColorScheme = "light",
    defaultDarkColorScheme = "dark",
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute: initialAttribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = "document.documentElement",
    nonce
  } = options || {};
  let setter = "";
  let attribute = initialAttribute;
  if (initialAttribute === "class") {
    attribute = ".%s";
  }
  if (initialAttribute === "data") {
    attribute = "[data-%s]";
  }
  if (attribute.startsWith(".")) {
    const selector = attribute.substring(1);
    setter += `${colorSchemeNode}.classList.remove('${selector}'.replace('%s', light), '${selector}'.replace('%s', dark));
      ${colorSchemeNode}.classList.add('${selector}'.replace('%s', colorScheme));`;
  }
  const matches = attribute.match(/\[([^\]]+)\]/);
  if (matches) {
    const [attr, value] = matches[1].split("=");
    if (!value) {
      setter += `${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', light));
      ${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', dark));`;
    }
    setter += `
      ${colorSchemeNode}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : '""'});`;
  } else {
    setter += `${colorSchemeNode}.setAttribute('${attribute}', colorScheme);`;
  }
  return (0, import_jsx_runtime9.jsx)("script", {
    suppressHydrationWarning: true,
    nonce: typeof window === "undefined" ? nonce : "",
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${modeStorageKey}') || 'system';
  const dark = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
  const light = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${setter}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
var React28, import_jsx_runtime9, DEFAULT_MODE_STORAGE_KEY, DEFAULT_COLOR_SCHEME_STORAGE_KEY, DEFAULT_ATTRIBUTE;
var init_InitColorSchemeScript = __esm({
  "node_modules/@mui/system/InitColorSchemeScript/InitColorSchemeScript.js"() {
    React28 = __toESM(require_react());
    import_jsx_runtime9 = __toESM(require_jsx_runtime());
    DEFAULT_MODE_STORAGE_KEY = "mode";
    DEFAULT_COLOR_SCHEME_STORAGE_KEY = "color-scheme";
    DEFAULT_ATTRIBUTE = "data-color-scheme";
  }
});

// node_modules/@mui/system/cssVars/useCurrentColorScheme.js
function getSystemMode(mode) {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function" && mode === "system") {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    if (mql.matches) {
      return "dark";
    }
    return "light";
  }
  return void 0;
}
function processState(state, callback) {
  if (state.mode === "light" || state.mode === "system" && state.systemMode === "light") {
    return callback("light");
  }
  if (state.mode === "dark" || state.mode === "system" && state.systemMode === "dark") {
    return callback("dark");
  }
  return void 0;
}
function getColorScheme(state) {
  return processState(state, (mode) => {
    if (mode === "light") {
      return state.lightColorScheme;
    }
    if (mode === "dark") {
      return state.darkColorScheme;
    }
    return void 0;
  });
}
function initializeValue(key, defaultValue) {
  if (typeof window === "undefined") {
    return void 0;
  }
  let value;
  try {
    value = localStorage.getItem(key) || void 0;
    if (!value) {
      localStorage.setItem(key, defaultValue);
    }
  } catch {
  }
  return value || defaultValue;
}
function useCurrentColorScheme(options) {
  const {
    defaultMode = "light",
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === "undefined" ? void 0 : window
  } = options;
  const joinedColorSchemes = supportedColorSchemes.join(",");
  const isMultiSchemes = supportedColorSchemes.length > 1;
  const [state, setState] = React29.useState(() => {
    const initialMode = initializeValue(modeStorageKey, defaultMode);
    const lightColorScheme = initializeValue(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
    const darkColorScheme = initializeValue(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme
    };
  });
  const [, setHasMounted] = React29.useState(false);
  const hasMounted = React29.useRef(false);
  React29.useEffect(() => {
    if (isMultiSchemes) {
      setHasMounted(true);
    }
    hasMounted.current = true;
  }, [isMultiSchemes]);
  const colorScheme = getColorScheme(state);
  const setMode = React29.useCallback((mode) => {
    setState((currentState) => {
      if (mode === currentState.mode) {
        return currentState;
      }
      const newMode = mode ?? defaultMode;
      try {
        localStorage.setItem(modeStorageKey, newMode);
      } catch {
      }
      return {
        ...currentState,
        mode: newMode,
        systemMode: getSystemMode(newMode)
      };
    });
  }, [modeStorageKey, defaultMode]);
  const setColorScheme = React29.useCallback((value) => {
    if (!value) {
      setState((currentState) => {
        try {
          localStorage.setItem(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
          localStorage.setItem(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
        } catch {
        }
        return {
          ...currentState,
          lightColorScheme: defaultLightColorScheme,
          darkColorScheme: defaultDarkColorScheme
        };
      });
    } else if (typeof value === "string") {
      if (value && !joinedColorSchemes.includes(value)) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState((currentState) => {
          const newState = {
            ...currentState
          };
          processState(currentState, (mode) => {
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
            } catch {
            }
            if (mode === "light") {
              newState.lightColorScheme = value;
            }
            if (mode === "dark") {
              newState.darkColorScheme = value;
            }
          });
          return newState;
        });
      }
    } else {
      setState((currentState) => {
        const newState = {
          ...currentState
        };
        const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
        const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
        if (newLightColorScheme) {
          if (!joinedColorSchemes.includes(newLightColorScheme)) {
            console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.lightColorScheme = newLightColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-light`, newLightColorScheme);
            } catch (error) {
            }
          }
        }
        if (newDarkColorScheme) {
          if (!joinedColorSchemes.includes(newDarkColorScheme)) {
            console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.darkColorScheme = newDarkColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-dark`, newDarkColorScheme);
            } catch (error) {
            }
          }
        }
        return newState;
      });
    }
  }, [joinedColorSchemes, colorSchemeStorageKey, defaultLightColorScheme, defaultDarkColorScheme]);
  const handleMediaQuery = React29.useCallback((event) => {
    if (state.mode === "system") {
      setState((currentState) => {
        const systemMode = (event == null ? void 0 : event.matches) ? "dark" : "light";
        if (currentState.systemMode === systemMode) {
          return currentState;
        }
        return {
          ...currentState,
          systemMode
        };
      });
    }
  }, [state.mode]);
  const mediaListener = React29.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;
  React29.useEffect(() => {
    if (typeof window.matchMedia !== "function" || !isMultiSchemes) {
      return void 0;
    }
    const handler = (...args) => mediaListener.current(...args);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addListener(handler);
    handler(media);
    return () => {
      media.removeListener(handler);
    };
  }, [isMultiSchemes]);
  React29.useEffect(() => {
    if (storageWindow && isMultiSchemes) {
      const handleStorage = (event) => {
        const value = event.newValue;
        if (typeof event.key === "string" && event.key.startsWith(colorSchemeStorageKey) && (!value || joinedColorSchemes.match(value))) {
          if (event.key.endsWith("light")) {
            setColorScheme({
              light: value
            });
          }
          if (event.key.endsWith("dark")) {
            setColorScheme({
              dark: value
            });
          }
        }
        if (event.key === modeStorageKey && (!value || ["light", "dark", "system"].includes(value))) {
          setMode(value || defaultMode);
        }
      };
      storageWindow.addEventListener("storage", handleStorage);
      return () => {
        storageWindow.removeEventListener("storage", handleStorage);
      };
    }
    return void 0;
  }, [setColorScheme, setMode, modeStorageKey, colorSchemeStorageKey, joinedColorSchemes, defaultMode, storageWindow, isMultiSchemes]);
  return {
    ...state,
    mode: hasMounted.current || !isMultiSchemes ? state.mode : void 0,
    systemMode: hasMounted.current || !isMultiSchemes ? state.systemMode : void 0,
    colorScheme: hasMounted.current || !isMultiSchemes ? colorScheme : void 0,
    setMode,
    setColorScheme
  };
}
var React29;
var init_useCurrentColorScheme = __esm({
  "node_modules/@mui/system/cssVars/useCurrentColorScheme.js"() {
    "use client";
    React29 = __toESM(require_react());
    init_InitColorSchemeScript();
  }
});

// node_modules/@mui/system/cssVars/createCssVarsProvider.js
function createCssVarsProvider(options) {
  const {
    themeId,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: defaultTheme5 = {},
    modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    defaultColorScheme,
    resolveTheme: resolveTheme2
  } = options;
  const defaultContext = {
    allColorSchemes: [],
    colorScheme: void 0,
    darkColorScheme: void 0,
    lightColorScheme: void 0,
    mode: void 0,
    setColorScheme: () => {
    },
    setMode: () => {
    },
    systemMode: void 0
  };
  const ColorSchemeContext = React30.createContext(void 0);
  if (true) {
    ColorSchemeContext.displayName = "ColorSchemeContext";
  }
  const useColorScheme = () => React30.useContext(ColorSchemeContext) || defaultContext;
  function CssVarsProvider(props) {
    var _a, _b, _c, _d, _e;
    const {
      children,
      theme: themeProp,
      modeStorageKey = defaultModeStorageKey,
      colorSchemeStorageKey = defaultColorSchemeStorageKey,
      disableTransitionOnChange = designSystemTransitionOnChange,
      storageWindow = typeof window === "undefined" ? void 0 : window,
      documentNode = typeof document === "undefined" ? void 0 : document,
      colorSchemeNode = typeof document === "undefined" ? void 0 : document.documentElement,
      disableNestedContext = false,
      disableStyleSheetGeneration = false,
      defaultMode: initialMode = "system"
    } = props;
    const hasMounted = React30.useRef(false);
    const upperTheme = useTheme4();
    const ctx = React30.useContext(ColorSchemeContext);
    const nested = !!ctx && !disableNestedContext;
    const initialTheme = React30.useMemo(() => {
      if (themeProp) {
        return themeProp;
      }
      return typeof defaultTheme5 === "function" ? defaultTheme5() : defaultTheme5;
    }, [themeProp]);
    const scopedTheme = initialTheme[themeId];
    const {
      colorSchemes = {},
      components = {},
      cssVarPrefix,
      ...restThemeProp
    } = scopedTheme || initialTheme;
    const joinedColorSchemes = Object.keys(colorSchemes).filter((k) => !!colorSchemes[k]).join(",");
    const allColorSchemes = React30.useMemo(() => joinedColorSchemes.split(","), [joinedColorSchemes]);
    const defaultLightColorScheme2 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme2 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
    const defaultMode = colorSchemes[defaultLightColorScheme2] && colorSchemes[defaultDarkColorScheme2] ? initialMode : ((_b = (_a = colorSchemes[restThemeProp.defaultColorScheme]) == null ? void 0 : _a.palette) == null ? void 0 : _b.mode) || ((_c = restThemeProp.palette) == null ? void 0 : _c.mode);
    const {
      mode: stateMode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme: stateColorScheme,
      setColorScheme
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme: defaultLightColorScheme2,
      defaultDarkColorScheme: defaultDarkColorScheme2,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageWindow
    });
    let mode = stateMode;
    let colorScheme = stateColorScheme;
    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }
    const calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;
    const themeVars = ((_d = restThemeProp.generateThemeVars) == null ? void 0 : _d.call(restThemeProp)) || restThemeProp.vars;
    const theme = {
      ...restThemeProp,
      components,
      colorSchemes,
      cssVarPrefix,
      vars: themeVars
    };
    if (typeof theme.generateSpacing === "function") {
      theme.spacing = theme.generateSpacing();
    }
    if (calculatedColorScheme) {
      const scheme = colorSchemes[calculatedColorScheme];
      if (scheme && typeof scheme === "object") {
        Object.keys(scheme).forEach((schemeKey) => {
          if (scheme[schemeKey] && typeof scheme[schemeKey] === "object") {
            theme[schemeKey] = {
              ...theme[schemeKey],
              ...scheme[schemeKey]
            };
          } else {
            theme[schemeKey] = scheme[schemeKey];
          }
        });
      }
    }
    const colorSchemeSelector = restThemeProp.colorSchemeSelector;
    React30.useEffect(() => {
      if (colorScheme && colorSchemeNode && colorSchemeSelector && colorSchemeSelector !== "media") {
        const selector = colorSchemeSelector;
        let rule = colorSchemeSelector;
        if (selector === "class") {
          rule = `.%s`;
        }
        if (selector === "data") {
          rule = `[data-%s]`;
        }
        if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
          rule = `[${selector}="%s"]`;
        }
        if (rule.startsWith(".")) {
          colorSchemeNode.classList.remove(...allColorSchemes.map((scheme) => rule.substring(1).replace("%s", scheme)));
          colorSchemeNode.classList.add(rule.substring(1).replace("%s", colorScheme));
        } else {
          const matches = rule.replace("%s", colorScheme).match(/\[([^\]]+)\]/);
          if (matches) {
            const [attr, value] = matches[1].split("=");
            if (!value) {
              allColorSchemes.forEach((scheme) => {
                colorSchemeNode.removeAttribute(attr.replace(colorScheme, scheme));
              });
            }
            colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, "") : "");
          } else {
            colorSchemeNode.setAttribute(rule, colorScheme);
          }
        }
      }
    }, [colorScheme, colorSchemeSelector, colorSchemeNode, allColorSchemes]);
    React30.useEffect(() => {
      let timer;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        const css2 = documentNode.createElement("style");
        css2.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css2);
        (() => window.getComputedStyle(documentNode.body))();
        timer = setTimeout(() => {
          documentNode.head.removeChild(css2);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode]);
    React30.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);
    const contextValue = React30.useMemo(() => ({
      allColorSchemes,
      colorScheme,
      darkColorScheme,
      lightColorScheme,
      mode,
      setColorScheme,
      setMode,
      systemMode
    }), [allColorSchemes, colorScheme, darkColorScheme, lightColorScheme, mode, setColorScheme, setMode, systemMode]);
    let shouldGenerateStyleSheet = true;
    if (disableStyleSheetGeneration || restThemeProp.cssVariables === false || nested && (upperTheme == null ? void 0 : upperTheme.cssVarPrefix) === cssVarPrefix) {
      shouldGenerateStyleSheet = false;
    }
    const element = (0, import_jsx_runtime10.jsxs)(React30.Fragment, {
      children: [(0, import_jsx_runtime10.jsx)(ThemeProvider_default2, {
        themeId: scopedTheme ? themeId : void 0,
        theme: resolveTheme2 ? resolveTheme2(theme) : theme,
        children
      }), shouldGenerateStyleSheet && (0, import_jsx_runtime10.jsx)(GlobalStyles, {
        styles: ((_e = theme.generateStyleSheets) == null ? void 0 : _e.call(theme)) || []
      })]
    });
    if (nested) {
      return element;
    }
    return (0, import_jsx_runtime10.jsx)(ColorSchemeContext.Provider, {
      value: contextValue,
      children: element
    });
  }
  true ? CssVarsProvider.propTypes = {
    /**
     * The component tree.
     */
    children: import_prop_types14.default.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: import_prop_types14.default.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: import_prop_types14.default.string,
    /**
     * The default mode when the storage is empty,
     * require the theme to have `colorSchemes` with light and dark.
     */
    defaultMode: import_prop_types14.default.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: import_prop_types14.default.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: import_prop_types14.default.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: import_prop_types14.default.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: import_prop_types14.default.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: import_prop_types14.default.string,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: import_prop_types14.default.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: import_prop_types14.default.object
  } : void 0;
  const defaultLightColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
  const defaultDarkColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
  const getInitColorSchemeScript = (params) => InitColorSchemeScript({
    colorSchemeStorageKey: defaultColorSchemeStorageKey,
    defaultLightColorScheme,
    defaultDarkColorScheme,
    modeStorageKey: defaultModeStorageKey,
    ...params
  });
  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript
  };
}
var React30, import_prop_types14, import_jsx_runtime10, DISABLE_CSS_TRANSITION;
var init_createCssVarsProvider = __esm({
  "node_modules/@mui/system/cssVars/createCssVarsProvider.js"() {
    React30 = __toESM(require_react());
    import_prop_types14 = __toESM(require_prop_types());
    init_styled_engine();
    init_private_theming();
    init_ThemeProvider4();
    init_InitColorSchemeScript();
    init_useCurrentColorScheme();
    import_jsx_runtime10 = __toESM(require_jsx_runtime());
    DISABLE_CSS_TRANSITION = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
  }
});

// node_modules/@mui/system/cssVars/createGetCssVar.js
function createGetCssVar(prefix3 = "") {
  function appendVar(...vars) {
    if (!vars.length) {
      return "";
    }
    const value = vars[0];
    if (typeof value === "string" && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)) {
      return `, var(--${prefix3 ? `${prefix3}-` : ""}${value}${appendVar(...vars.slice(1))})`;
    }
    return `, ${value}`;
  }
  const getCssVar = (field, ...fallbacks) => {
    return `var(--${prefix3 ? `${prefix3}-` : ""}${field}${appendVar(...fallbacks)})`;
  };
  return getCssVar;
}
var init_createGetCssVar = __esm({
  "node_modules/@mui/system/cssVars/createGetCssVar.js"() {
  }
});

// node_modules/@mui/system/cssVars/cssVarsParser.js
function cssVarsParser(theme, options) {
  const {
    prefix: prefix3,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2
  } = options || {};
  const css2 = {};
  const vars = {};
  const varsWithDefaults = {};
  walkObjectDeep(
    theme,
    (keys, value, arrayKeys) => {
      if (typeof value === "string" || typeof value === "number") {
        if (!shouldSkipGeneratingVar2 || !shouldSkipGeneratingVar2(keys, value)) {
          const cssVar = `--${prefix3 ? `${prefix3}-` : ""}${keys.join("-")}`;
          const resolvedValue = getCssValue(keys, value);
          Object.assign(css2, {
            [cssVar]: resolvedValue
          });
          assignNestedKeys(vars, keys, `var(${cssVar})`, arrayKeys);
          assignNestedKeys(varsWithDefaults, keys, `var(${cssVar}, ${resolvedValue})`, arrayKeys);
        }
      }
    },
    (keys) => keys[0] === "vars"
    // skip 'vars/*' paths
  );
  return {
    css: css2,
    vars,
    varsWithDefaults
  };
}
var assignNestedKeys, walkObjectDeep, getCssValue;
var init_cssVarsParser = __esm({
  "node_modules/@mui/system/cssVars/cssVarsParser.js"() {
    assignNestedKeys = (obj, keys, value, arrayKeys = []) => {
      let temp = obj;
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          if (Array.isArray(temp)) {
            temp[Number(k)] = value;
          } else if (temp && typeof temp === "object") {
            temp[k] = value;
          }
        } else if (temp && typeof temp === "object") {
          if (!temp[k]) {
            temp[k] = arrayKeys.includes(k) ? [] : {};
          }
          temp = temp[k];
        }
      });
    };
    walkObjectDeep = (obj, callback, shouldSkipPaths) => {
      function recurse(object, parentKeys = [], arrayKeys = []) {
        Object.entries(object).forEach(([key, value]) => {
          if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([...parentKeys, key])) {
            if (value !== void 0 && value !== null) {
              if (typeof value === "object" && Object.keys(value).length > 0) {
                recurse(value, [...parentKeys, key], Array.isArray(value) ? [...arrayKeys, key] : arrayKeys);
              } else {
                callback([...parentKeys, key], value, arrayKeys);
              }
            }
          }
        });
      }
      recurse(obj);
    };
    getCssValue = (keys, value) => {
      if (typeof value === "number") {
        if (["lineHeight", "fontWeight", "opacity", "zIndex"].some((prop) => keys.includes(prop))) {
          return value;
        }
        const lastKey = keys[keys.length - 1];
        if (lastKey.toLowerCase().includes("opacity")) {
          return value;
        }
        return `${value}px`;
      }
      return value;
    };
  }
});

// node_modules/@mui/system/cssVars/prepareCssVars.js
function prepareCssVars(theme, parserConfig = {}) {
  const {
    getSelector = defaultGetSelector,
    disableCssColorScheme,
    colorSchemeSelector: selector
  } = parserConfig;
  const {
    colorSchemes = {},
    components,
    defaultColorScheme = "light",
    ...otherTheme
  } = theme;
  const {
    vars: rootVars,
    css: rootCss,
    varsWithDefaults: rootVarsWithDefaults
  } = cssVarsParser(otherTheme, parserConfig);
  let themeVars = rootVarsWithDefaults;
  const colorSchemesMap = {};
  const {
    [defaultColorScheme]: defaultScheme,
    ...otherColorSchemes
  } = colorSchemes;
  Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
    const {
      vars,
      css: css2,
      varsWithDefaults
    } = cssVarsParser(scheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = {
      css: css2,
      vars
    };
  });
  if (defaultScheme) {
    const {
      css: css2,
      vars,
      varsWithDefaults
    } = cssVarsParser(defaultScheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[defaultColorScheme] = {
      css: css2,
      vars
    };
  }
  function defaultGetSelector(colorScheme, cssObject) {
    var _a, _b;
    let rule = selector;
    if (selector === "class") {
      rule = ".%s";
    }
    if (selector === "data") {
      rule = "[data-%s]";
    }
    if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
      rule = `[${selector}="%s"]`;
    }
    if (colorScheme) {
      if (rule === "media") {
        if (theme.defaultColorScheme === colorScheme) {
          return ":root";
        }
        const mode = ((_b = (_a = colorSchemes[colorScheme]) == null ? void 0 : _a.palette) == null ? void 0 : _b.mode) || colorScheme;
        return {
          [`@media (prefers-color-scheme: ${mode})`]: {
            ":root": cssObject
          }
        };
      }
      if (rule) {
        if (theme.defaultColorScheme === colorScheme) {
          return `:root, ${rule.replace("%s", String(colorScheme))}`;
        }
        return rule.replace("%s", String(colorScheme));
      }
    }
    return ":root";
  }
  const generateThemeVars = () => {
    let vars = {
      ...rootVars
    };
    Object.entries(colorSchemesMap).forEach(([, {
      vars: schemeVars
    }]) => {
      vars = deepmerge(vars, schemeVars);
    });
    return vars;
  };
  const generateStyleSheets = () => {
    var _a, _b;
    const stylesheets = [];
    const colorScheme = theme.defaultColorScheme || "light";
    function insertStyleSheet(key, css2) {
      if (Object.keys(css2).length) {
        stylesheets.push(typeof key === "string" ? {
          [key]: {
            ...css2
          }
        } : key);
      }
    }
    insertStyleSheet(getSelector(void 0, {
      ...rootCss
    }), rootCss);
    const {
      [colorScheme]: defaultSchemeVal,
      ...other
    } = colorSchemesMap;
    if (defaultSchemeVal) {
      const {
        css: css2
      } = defaultSchemeVal;
      const cssColorSheme = (_b = (_a = colorSchemes[colorScheme]) == null ? void 0 : _a.palette) == null ? void 0 : _b.mode;
      const finalCss = !disableCssColorScheme && cssColorSheme ? {
        colorScheme: cssColorSheme,
        ...css2
      } : {
        ...css2
      };
      insertStyleSheet(getSelector(colorScheme, {
        ...finalCss
      }), finalCss);
    }
    Object.entries(other).forEach(([key, {
      css: css2
    }]) => {
      var _a2, _b2;
      const cssColorSheme = (_b2 = (_a2 = colorSchemes[key]) == null ? void 0 : _a2.palette) == null ? void 0 : _b2.mode;
      const finalCss = !disableCssColorScheme && cssColorSheme ? {
        colorScheme: cssColorSheme,
        ...css2
      } : {
        ...css2
      };
      insertStyleSheet(getSelector(key, {
        ...finalCss
      }), finalCss);
    });
    return stylesheets;
  };
  return {
    vars: themeVars,
    generateThemeVars,
    generateStyleSheets
  };
}
var prepareCssVars_default;
var init_prepareCssVars = __esm({
  "node_modules/@mui/system/cssVars/prepareCssVars.js"() {
    init_deepmerge2();
    init_cssVarsParser();
    prepareCssVars_default = prepareCssVars;
  }
});

// node_modules/@mui/system/cssVars/getColorSchemeSelector.js
function createGetColorSchemeSelector(selector) {
  return function getColorSchemeSelector(colorScheme) {
    if (selector === "media") {
      if (true) {
        if (colorScheme !== "light" && colorScheme !== "dark") {
          console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${colorScheme}'.`);
        }
      }
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    if (selector) {
      if (selector.startsWith("data-") && !selector.includes("%s")) {
        return `[${selector}="${colorScheme}"] &`;
      }
      if (selector === "class") {
        return `.${colorScheme} &`;
      }
      if (selector === "data") {
        return `[data-${colorScheme}] &`;
      }
      return `${selector.replace("%s", colorScheme)} &`;
    }
    return "&";
  };
}
var init_getColorSchemeSelector = __esm({
  "node_modules/@mui/system/cssVars/getColorSchemeSelector.js"() {
  }
});

// node_modules/@mui/system/cssVars/createCssVarsTheme.js
var init_createCssVarsTheme = __esm({
  "node_modules/@mui/system/cssVars/createCssVarsTheme.js"() {
    init_prepareCssVars();
    init_getColorSchemeSelector();
    init_InitColorSchemeScript();
  }
});

// node_modules/@mui/system/version/index.js
var major, minor, patch;
var init_version = __esm({
  "node_modules/@mui/system/version/index.js"() {
    major = Number("6");
    minor = Number("1");
    patch = Number("2");
  }
});

// node_modules/@mui/system/Container/createContainer.js
function createContainer(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps: useThemeProps2 = useThemePropsDefault,
    componentName = "MuiContainer"
  } = options;
  const ContainerRoot = createStyledComponent(({
    theme,
    ownerState
  }) => ({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    ...!ownerState.disableGutters && {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
    const breakpoint = breakpointValueKey;
    const value = theme.breakpoints.values[breakpoint];
    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: `${value}${theme.breakpoints.unit}`
      };
    }
    return acc;
  }, {}), ({
    theme,
    ownerState
  }) => ({
    // @ts-ignore module augmentation fails if custom breakpoints are used
    ...ownerState.maxWidth === "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [theme.breakpoints.up("xs")]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: Math.max(theme.breakpoints.values.xs, 444)
      }
    },
    ...ownerState.maxWidth && // @ts-ignore module augmentation fails if custom breakpoints are used
    ownerState.maxWidth !== "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [theme.breakpoints.up(ownerState.maxWidth)]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
      }
    }
  }));
  const Container2 = React31.forwardRef(function Container3(inProps, ref) {
    const props = useThemeProps2(inProps);
    const {
      className,
      component = "div",
      disableGutters = false,
      fixed = false,
      maxWidth: maxWidth2 = "lg",
      classes: classesProp,
      ...other
    } = props;
    const ownerState = {
      ...props,
      component,
      disableGutters,
      fixed,
      maxWidth: maxWidth2
    };
    const classes = useUtilityClasses(ownerState, componentName);
    return (
      // @ts-ignore theme is injected by the styled util
      (0, import_jsx_runtime11.jsx)(ContainerRoot, {
        as: component,
        ownerState,
        className: clsx_default(classes.root, className),
        ref,
        ...other
      })
    );
  });
  true ? Container2.propTypes = {
    children: import_prop_types15.default.node,
    classes: import_prop_types15.default.object,
    className: import_prop_types15.default.string,
    component: import_prop_types15.default.elementType,
    disableGutters: import_prop_types15.default.bool,
    fixed: import_prop_types15.default.bool,
    maxWidth: import_prop_types15.default.oneOfType([import_prop_types15.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types15.default.string]),
    sx: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object, import_prop_types15.default.bool])), import_prop_types15.default.func, import_prop_types15.default.object])
  } : void 0;
  return Container2;
}
var React31, import_prop_types15, import_jsx_runtime11, defaultTheme, defaultCreateStyledComponent, useThemePropsDefault, useUtilityClasses;
var init_createContainer = __esm({
  "node_modules/@mui/system/Container/createContainer.js"() {
    React31 = __toESM(require_react());
    import_prop_types15 = __toESM(require_prop_types());
    init_clsx();
    init_generateUtilityClass2();
    init_composeClasses2();
    init_capitalize2();
    init_useThemeProps2();
    init_styled2();
    init_createTheme2();
    import_jsx_runtime11 = __toESM(require_jsx_runtime());
    defaultTheme = createTheme_default();
    defaultCreateStyledComponent = styled_default("div", {
      name: "MuiContainer",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
      }
    });
    useThemePropsDefault = (inProps) => useThemeProps({
      props: inProps,
      name: "MuiContainer",
      defaultTheme
    });
    useUtilityClasses = (ownerState, componentName) => {
      const getContainerUtilityClass = (slot) => {
        return generateUtilityClass(componentName, slot);
      };
      const {
        classes,
        fixed,
        disableGutters,
        maxWidth: maxWidth2
      } = ownerState;
      const slots = {
        root: ["root", maxWidth2 && `maxWidth${capitalize(String(maxWidth2))}`, fixed && "fixed", disableGutters && "disableGutters"]
      };
      return composeClasses(slots, getContainerUtilityClass, classes);
    };
  }
});

// node_modules/@mui/system/Container/Container.js
var import_prop_types16, Container;
var init_Container = __esm({
  "node_modules/@mui/system/Container/Container.js"() {
    "use client";
    import_prop_types16 = __toESM(require_prop_types());
    init_createContainer();
    Container = createContainer();
    true ? Container.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types16.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types16.default.object,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types16.default.elementType,
      /**
       * If `true`, the left and right padding is removed.
       * @default false
       */
      disableGutters: import_prop_types16.default.bool,
      /**
       * Set the max-width to match the min-width of the current breakpoint.
       * This is useful if you'd prefer to design for a fixed set of sizes
       * instead of trying to accommodate a fully fluid viewport.
       * It's fluid by default.
       * @default false
       */
      fixed: import_prop_types16.default.bool,
      /**
       * Determine the max-width of the container.
       * The container width grows with the size of the screen.
       * Set to `false` to disable `maxWidth`.
       * @default 'lg'
       */
      maxWidth: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types16.default.string]),
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object, import_prop_types16.default.bool])), import_prop_types16.default.func, import_prop_types16.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/Container/containerClasses.js
var containerClasses;
var init_containerClasses = __esm({
  "node_modules/@mui/system/Container/containerClasses.js"() {
    init_generateUtilityClasses2();
    init_generateUtilityClass2();
    containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
  }
});

// node_modules/@mui/system/Container/index.js
var init_Container2 = __esm({
  "node_modules/@mui/system/Container/index.js"() {
    init_Container();
    init_containerClasses();
    init_containerClasses();
  }
});

// node_modules/@mui/system/Grid/traverseBreakpoints.js
var filterBreakpointKeys, traverseBreakpoints;
var init_traverseBreakpoints = __esm({
  "node_modules/@mui/system/Grid/traverseBreakpoints.js"() {
    filterBreakpointKeys = (breakpointsKeys, responsiveKeys) => breakpointsKeys.filter((key) => responsiveKeys.includes(key));
    traverseBreakpoints = (breakpoints, responsive, iterator) => {
      const smallestBreakpoint = breakpoints.keys[0];
      if (Array.isArray(responsive)) {
        responsive.forEach((breakpointValue, index) => {
          iterator((responsiveStyles, style4) => {
            if (index <= breakpoints.keys.length - 1) {
              if (index === 0) {
                Object.assign(responsiveStyles, style4);
              } else {
                responsiveStyles[breakpoints.up(breakpoints.keys[index])] = style4;
              }
            }
          }, breakpointValue);
        });
      } else if (responsive && typeof responsive === "object") {
        const keys = Object.keys(responsive).length > breakpoints.keys.length ? breakpoints.keys : filterBreakpointKeys(breakpoints.keys, Object.keys(responsive));
        keys.forEach((key) => {
          if (breakpoints.keys.includes(key)) {
            const breakpointValue = responsive[key];
            if (breakpointValue !== void 0) {
              iterator((responsiveStyles, style4) => {
                if (smallestBreakpoint === key) {
                  Object.assign(responsiveStyles, style4);
                } else {
                  responsiveStyles[breakpoints.up(key)] = style4;
                }
              }, breakpointValue);
            }
          }
        });
      } else if (typeof responsive === "number" || typeof responsive === "string") {
        iterator((responsiveStyles, style4) => {
          Object.assign(responsiveStyles, style4);
        }, responsive);
      }
    };
  }
});

// node_modules/@mui/system/Grid/gridGenerator.js
function appendLevel(level) {
  if (!level) {
    return "";
  }
  return `Level${level}`;
}
function isNestedContainer(ownerState) {
  return ownerState.unstable_level > 0 && ownerState.container;
}
function createGetSelfSpacing(ownerState) {
  return function getSelfSpacing(axis) {
    return `var(--Grid-${axis}Spacing${appendLevel(ownerState.unstable_level)})`;
  };
}
function createGetParentSpacing(ownerState) {
  return function getParentSpacing(axis) {
    if (ownerState.unstable_level === 0) {
      return `var(--Grid-${axis}Spacing)`;
    }
    return `var(--Grid-${axis}Spacing${appendLevel(ownerState.unstable_level - 1)})`;
  };
}
function getParentColumns(ownerState) {
  if (ownerState.unstable_level === 0) {
    return `var(--Grid-columns)`;
  }
  return `var(--Grid-columns${appendLevel(ownerState.unstable_level - 1)})`;
}
var generateGridSizeStyles, generateGridOffsetStyles, generateGridColumnsStyles, generateGridRowSpacingStyles, generateGridColumnSpacingStyles, generateGridDirectionStyles, generateGridStyles, generateSizeClassNames, generateSpacingClassNames, generateDirectionClasses;
var init_gridGenerator = __esm({
  "node_modules/@mui/system/Grid/gridGenerator.js"() {
    init_traverseBreakpoints();
    generateGridSizeStyles = ({
      theme,
      ownerState
    }) => {
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = {};
      traverseBreakpoints(theme.breakpoints, ownerState.size, (appendStyle, value) => {
        let style4 = {};
        if (value === "grow") {
          style4 = {
            flexBasis: 0,
            flexGrow: 1,
            maxWidth: "100%"
          };
        }
        if (value === "auto") {
          style4 = {
            flexBasis: "auto",
            flexGrow: 0,
            flexShrink: 0,
            maxWidth: "none",
            width: "auto"
          };
        }
        if (typeof value === "number") {
          style4 = {
            flexGrow: 0,
            flexBasis: "auto",
            width: `calc(100% * ${value} / ${getParentColumns(ownerState)} - (${getParentColumns(ownerState)} - ${value}) * (${getParentSpacing("column")} / ${getParentColumns(ownerState)}))`
          };
        }
        appendStyle(styles, style4);
      });
      return styles;
    };
    generateGridOffsetStyles = ({
      theme,
      ownerState
    }) => {
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = {};
      traverseBreakpoints(theme.breakpoints, ownerState.offset, (appendStyle, value) => {
        let style4 = {};
        if (value === "auto") {
          style4 = {
            marginLeft: "auto"
          };
        }
        if (typeof value === "number") {
          style4 = {
            marginLeft: value === 0 ? "0px" : `calc(100% * ${value} / ${getParentColumns(ownerState)} + ${getParentSpacing("column")} * ${value} / ${getParentColumns(ownerState)})`
          };
        }
        appendStyle(styles, style4);
      });
      return styles;
    };
    generateGridColumnsStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles = isNestedContainer(ownerState) ? {
        [`--Grid-columns${appendLevel(ownerState.unstable_level)}`]: getParentColumns(ownerState)
      } : {
        "--Grid-columns": 12
      };
      traverseBreakpoints(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
        appendStyle(styles, {
          [`--Grid-columns${appendLevel(ownerState.unstable_level)}`]: value
        });
      });
      return styles;
    };
    generateGridRowSpacingStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = isNestedContainer(ownerState) ? {
        // Set the default spacing as its parent spacing.
        // It will be overridden if spacing props are provided
        [`--Grid-rowSpacing${appendLevel(ownerState.unstable_level)}`]: getParentSpacing("row")
      } : {};
      traverseBreakpoints(theme.breakpoints, ownerState.rowSpacing, (appendStyle, value) => {
        var _a;
        appendStyle(styles, {
          [`--Grid-rowSpacing${appendLevel(ownerState.unstable_level)}`]: typeof value === "string" ? value : (_a = theme.spacing) == null ? void 0 : _a.call(theme, value)
        });
      });
      return styles;
    };
    generateGridColumnSpacingStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = isNestedContainer(ownerState) ? {
        // Set the default spacing as its parent spacing.
        // It will be overridden if spacing props are provided
        [`--Grid-columnSpacing${appendLevel(ownerState.unstable_level)}`]: getParentSpacing("column")
      } : {};
      traverseBreakpoints(theme.breakpoints, ownerState.columnSpacing, (appendStyle, value) => {
        var _a;
        appendStyle(styles, {
          [`--Grid-columnSpacing${appendLevel(ownerState.unstable_level)}`]: typeof value === "string" ? value : (_a = theme.spacing) == null ? void 0 : _a.call(theme, value)
        });
      });
      return styles;
    };
    generateGridDirectionStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles = {};
      traverseBreakpoints(theme.breakpoints, ownerState.direction, (appendStyle, value) => {
        appendStyle(styles, {
          flexDirection: value
        });
      });
      return styles;
    };
    generateGridStyles = ({
      ownerState
    }) => {
      const getSelfSpacing = createGetSelfSpacing(ownerState);
      return {
        minWidth: 0,
        boxSizing: "border-box",
        ...ownerState.container && {
          display: "flex",
          flexWrap: "wrap",
          ...ownerState.wrap && ownerState.wrap !== "wrap" && {
            flexWrap: ownerState.wrap
          },
          gap: `${getSelfSpacing("row")} ${getSelfSpacing("column")}`
        }
      };
    };
    generateSizeClassNames = (size) => {
      const classNames = [];
      Object.entries(size).forEach(([key, value]) => {
        if (value !== false && value !== void 0) {
          classNames.push(`grid-${key}-${String(value)}`);
        }
      });
      return classNames;
    };
    generateSpacingClassNames = (spacing2, smallestBreakpoint = "xs") => {
      function isValidSpacing(val) {
        if (val === void 0) {
          return false;
        }
        return typeof val === "string" && !Number.isNaN(Number(val)) || typeof val === "number" && val > 0;
      }
      if (isValidSpacing(spacing2)) {
        return [`spacing-${smallestBreakpoint}-${String(spacing2)}`];
      }
      if (typeof spacing2 === "object" && !Array.isArray(spacing2)) {
        const classNames = [];
        Object.entries(spacing2).forEach(([key, value]) => {
          if (isValidSpacing(value)) {
            classNames.push(`spacing-${key}-${String(value)}`);
          }
        });
        return classNames;
      }
      return [];
    };
    generateDirectionClasses = (direction) => {
      if (direction === void 0) {
        return [];
      }
      if (typeof direction === "object") {
        return Object.entries(direction).map(([key, value]) => `direction-${key}-${value}`);
      }
      return [`direction-xs-${String(direction)}`];
    };
  }
});

// node_modules/@mui/system/Grid/createGrid.js
function useThemePropsDefault2(props) {
  return useThemeProps({
    props,
    name: "MuiGrid",
    defaultTheme: defaultTheme2
  });
}
function createGrid(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent2,
    useThemeProps: useThemeProps2 = useThemePropsDefault2,
    componentName = "MuiGrid"
  } = options;
  const useUtilityClasses3 = (ownerState, theme) => {
    const {
      container,
      direction,
      spacing: spacing2,
      wrap,
      size
    } = ownerState;
    const slots = {
      root: ["root", container && "container", wrap !== "wrap" && `wrap-xs-${String(wrap)}`, ...generateDirectionClasses(direction), ...generateSizeClassNames(size), ...container ? generateSpacingClassNames(spacing2, theme.breakpoints.keys[0]) : []]
    };
    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };
  function parseResponsiveProp(propValue, breakpoints, shouldUseValue = () => true) {
    const parsedProp = {};
    if (propValue === null) {
      return parsedProp;
    }
    if (Array.isArray(propValue)) {
      propValue.forEach((value, index) => {
        if (value !== null && shouldUseValue(value) && breakpoints.keys[index]) {
          parsedProp[breakpoints.keys[index]] = value;
        }
      });
    } else if (typeof propValue === "object") {
      Object.keys(propValue).forEach((key) => {
        const value = propValue[key];
        if (value !== null && value !== void 0 && shouldUseValue(value)) {
          parsedProp[key] = value;
        }
      });
    } else {
      parsedProp[breakpoints.keys[0]] = propValue;
    }
    return parsedProp;
  }
  const GridRoot = createStyledComponent(generateGridColumnsStyles, generateGridColumnSpacingStyles, generateGridRowSpacingStyles, generateGridSizeStyles, generateGridDirectionStyles, generateGridStyles, generateGridOffsetStyles);
  const Grid2 = React32.forwardRef(function Grid3(inProps, ref) {
    const theme = useTheme_default();
    const themeProps = useThemeProps2(inProps);
    const props = extendSxProp(themeProps);
    const {
      className,
      children,
      columns: columnsProp = 12,
      container = false,
      component = "div",
      direction = "row",
      wrap = "wrap",
      size: sizeProp = {},
      offset: offsetProp = {},
      spacing: spacingProp = 0,
      rowSpacing: rowSpacingProp = spacingProp,
      columnSpacing: columnSpacingProp = spacingProp,
      unstable_level: level = 0,
      ...other
    } = props;
    const size = parseResponsiveProp(sizeProp, theme.breakpoints, (val) => val !== false);
    const offset = parseResponsiveProp(offsetProp, theme.breakpoints);
    const columns = inProps.columns ?? (level ? void 0 : columnsProp);
    const spacing2 = inProps.spacing ?? (level ? void 0 : spacingProp);
    const rowSpacing = inProps.rowSpacing ?? inProps.spacing ?? (level ? void 0 : rowSpacingProp);
    const columnSpacing = inProps.columnSpacing ?? inProps.spacing ?? (level ? void 0 : columnSpacingProp);
    const ownerState = {
      ...props,
      level,
      columns,
      container,
      direction,
      wrap,
      spacing: spacing2,
      rowSpacing,
      columnSpacing,
      size,
      offset
    };
    const classes = useUtilityClasses3(ownerState, theme);
    return (0, import_jsx_runtime12.jsx)(GridRoot, {
      ref,
      as: component,
      ownerState,
      className: clsx_default(classes.root, className),
      ...other,
      children: React32.Children.map(children, (child) => {
        var _a;
        if (React32.isValidElement(child) && isMuiElement(child, ["Grid"])) {
          return React32.cloneElement(child, {
            unstable_level: ((_a = child.props) == null ? void 0 : _a.unstable_level) ?? level + 1
          });
        }
        return child;
      })
    });
  });
  true ? Grid2.propTypes = {
    children: import_prop_types17.default.node,
    className: import_prop_types17.default.string,
    columns: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.number), import_prop_types17.default.number, import_prop_types17.default.object]),
    columnSpacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
    component: import_prop_types17.default.elementType,
    container: import_prop_types17.default.bool,
    direction: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types17.default.arrayOf(import_prop_types17.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types17.default.object]),
    offset: import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.number, import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.number])), import_prop_types17.default.object]),
    rowSpacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
    size: import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.bool, import_prop_types17.default.number, import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.bool, import_prop_types17.default.number])), import_prop_types17.default.object]),
    spacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
    sx: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object, import_prop_types17.default.bool])), import_prop_types17.default.func, import_prop_types17.default.object]),
    wrap: import_prop_types17.default.oneOf(["nowrap", "wrap-reverse", "wrap"])
  } : void 0;
  Grid2.muiName = "Grid";
  return Grid2;
}
var React32, import_prop_types17, import_jsx_runtime12, defaultTheme2, defaultCreateStyledComponent2;
var init_createGrid = __esm({
  "node_modules/@mui/system/Grid/createGrid.js"() {
    React32 = __toESM(require_react());
    import_prop_types17 = __toESM(require_prop_types());
    init_clsx();
    init_isMuiElement2();
    init_generateUtilityClass2();
    init_composeClasses2();
    init_styled2();
    init_useThemeProps2();
    init_useTheme2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_gridGenerator();
    import_jsx_runtime12 = __toESM(require_jsx_runtime());
    defaultTheme2 = createTheme_default();
    defaultCreateStyledComponent2 = styled_default("div", {
      name: "MuiGrid",
      slot: "Root",
      overridesResolver: (props, styles) => styles.root
    });
  }
});

// node_modules/@mui/system/Grid/Grid.js
var import_prop_types18, Grid;
var init_Grid = __esm({
  "node_modules/@mui/system/Grid/Grid.js"() {
    "use client";
    import_prop_types18 = __toESM(require_prop_types());
    init_createGrid();
    Grid = createGrid();
    true ? Grid.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * The content of the component.
       */
      children: import_prop_types18.default.node,
      /**
       * The number of columns.
       * @default 12
       */
      columns: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.number), import_prop_types18.default.number, import_prop_types18.default.object]),
      /**
       * Defines the horizontal space between the type `item` components.
       * It overrides the value of the `spacing` prop.
       */
      columnSpacing: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string])), import_prop_types18.default.number, import_prop_types18.default.object, import_prop_types18.default.string]),
      /**
       * If `true`, the component will have the flex *container* behavior.
       * You should be wrapping *items* with a *container*.
       * @default false
       */
      container: import_prop_types18.default.bool,
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'row'
       */
      direction: import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types18.default.arrayOf(import_prop_types18.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types18.default.object]),
      /**
       * Defines the offset value for the type `item` components.
       */
      offset: import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.number, import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.number])), import_prop_types18.default.object]),
      /**
       * Defines the vertical space between the type `item` components.
       * It overrides the value of the `spacing` prop.
       */
      rowSpacing: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string])), import_prop_types18.default.number, import_prop_types18.default.object, import_prop_types18.default.string]),
      /**
       * Defines the size of the the type `item` components.
       */
      size: import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.bool, import_prop_types18.default.number, import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.bool, import_prop_types18.default.number])), import_prop_types18.default.object]),
      /**
       * Defines the space between the type `item` components.
       * It can only be used on a type `container` component.
       * @default 0
       */
      spacing: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string])), import_prop_types18.default.number, import_prop_types18.default.object, import_prop_types18.default.string]),
      /**
       * @ignore
       */
      sx: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object, import_prop_types18.default.bool])), import_prop_types18.default.func, import_prop_types18.default.object]),
      /**
       * @internal
       * The level of the grid starts from `0`
       * and increases when the grid nests inside another grid regardless of container or item.
       *
       * ```js
       * <Grid> // level 0
       *   <Grid> // level 1
       *     <Grid> // level 2
       *   <Grid> // level 1
       * ```
       *
       * Only consecutive grid is considered nesting.
       * A grid container will start at `0` if there are non-Grid element above it.
       *
       * ```js
       * <Grid> // level 0
       *   <div>
       *     <Grid> // level 0
       *       <Grid> // level 1
       * ```
       */
      unstable_level: import_prop_types18.default.number,
      /**
       * Defines the `flex-wrap` style property.
       * It's applied for all screen sizes.
       * @default 'wrap'
       */
      wrap: import_prop_types18.default.oneOf(["nowrap", "wrap-reverse", "wrap"])
    } : void 0;
  }
});

// node_modules/@mui/system/Grid/GridProps.js
var init_GridProps = __esm({
  "node_modules/@mui/system/Grid/GridProps.js"() {
  }
});

// node_modules/@mui/system/Grid/gridClasses.js
var SPACINGS, DIRECTIONS, WRAPS, GRID_SIZES, gridClasses;
var init_gridClasses = __esm({
  "node_modules/@mui/system/Grid/gridClasses.js"() {
    init_generateUtilityClasses2();
    init_generateUtilityClass2();
    SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    DIRECTIONS = ["column-reverse", "column", "row-reverse", "row"];
    WRAPS = ["nowrap", "wrap-reverse", "wrap"];
    GRID_SIZES = ["auto", "grow", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    gridClasses = generateUtilityClasses("MuiGrid", [
      "root",
      "container",
      "item",
      // spacings
      ...SPACINGS.map((spacing2) => `spacing-xs-${spacing2}`),
      // direction values
      ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
      // wrap values
      ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
      // grid sizes for all breakpoints
      ...GRID_SIZES.map((size) => `grid-xs-${size}`),
      ...GRID_SIZES.map((size) => `grid-sm-${size}`),
      ...GRID_SIZES.map((size) => `grid-md-${size}`),
      ...GRID_SIZES.map((size) => `grid-lg-${size}`),
      ...GRID_SIZES.map((size) => `grid-xl-${size}`)
    ]);
  }
});

// node_modules/@mui/system/Grid/index.js
var init_Grid2 = __esm({
  "node_modules/@mui/system/Grid/index.js"() {
    init_Grid();
    init_createGrid();
    init_GridProps();
    init_gridClasses();
    init_gridClasses();
    init_traverseBreakpoints();
  }
});

// node_modules/@mui/system/Stack/createStack.js
function useThemePropsDefault3(props) {
  return useThemeProps({
    props,
    name: "MuiStack",
    defaultTheme: defaultTheme3
  });
}
function joinChildren(children, separator) {
  const childrenArray = React33.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push(React33.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }
    return output;
  }, []);
}
function createStack(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent3,
    useThemeProps: useThemeProps2 = useThemePropsDefault3,
    componentName = "MuiStack"
  } = options;
  const useUtilityClasses3 = () => {
    const slots = {
      root: ["root"]
    };
    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };
  const StackRoot = createStyledComponent(style3);
  const Stack2 = React33.forwardRef(function Grid2(inProps, ref) {
    const themeProps = useThemeProps2(inProps);
    const props = extendSxProp(themeProps);
    const {
      component = "div",
      direction = "column",
      spacing: spacing2 = 0,
      divider,
      children,
      className,
      useFlexGap = false,
      ...other
    } = props;
    const ownerState = {
      direction,
      spacing: spacing2,
      useFlexGap
    };
    const classes = useUtilityClasses3();
    return (0, import_jsx_runtime13.jsx)(StackRoot, {
      as: component,
      ownerState,
      ref,
      className: clsx_default(classes.root, className),
      ...other,
      children: divider ? joinChildren(children, divider) : children
    });
  });
  true ? Stack2.propTypes = {
    children: import_prop_types19.default.node,
    direction: import_prop_types19.default.oneOfType([import_prop_types19.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types19.default.arrayOf(import_prop_types19.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types19.default.object]),
    divider: import_prop_types19.default.node,
    spacing: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.number, import_prop_types19.default.string])), import_prop_types19.default.number, import_prop_types19.default.object, import_prop_types19.default.string]),
    sx: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object, import_prop_types19.default.bool])), import_prop_types19.default.func, import_prop_types19.default.object])
  } : void 0;
  return Stack2;
}
var React33, import_prop_types19, import_jsx_runtime13, defaultTheme3, defaultCreateStyledComponent3, getSideFromDirection, style3;
var init_createStack = __esm({
  "node_modules/@mui/system/Stack/createStack.js"() {
    React33 = __toESM(require_react());
    import_prop_types19 = __toESM(require_prop_types());
    init_clsx();
    init_deepmerge2();
    init_generateUtilityClass2();
    init_composeClasses2();
    init_styled2();
    init_useThemeProps2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_breakpoints2();
    init_spacing2();
    import_jsx_runtime13 = __toESM(require_jsx_runtime());
    defaultTheme3 = createTheme_default();
    defaultCreateStyledComponent3 = styled_default("div", {
      name: "MuiStack",
      slot: "Root",
      overridesResolver: (props, styles) => styles.root
    });
    getSideFromDirection = (direction) => {
      return {
        row: "Left",
        "row-reverse": "Right",
        column: "Top",
        "column-reverse": "Bottom"
      }[direction];
    };
    style3 = ({
      ownerState,
      theme
    }) => {
      let styles = {
        display: "flex",
        flexDirection: "column",
        ...handleBreakpoints({
          theme
        }, resolveBreakpointValues({
          values: ownerState.direction,
          breakpoints: theme.breakpoints.values
        }), (propValue) => ({
          flexDirection: propValue
        }))
      };
      if (ownerState.spacing) {
        const transformer = createUnarySpacing(theme);
        const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
          if (typeof ownerState.spacing === "object" && ownerState.spacing[breakpoint] != null || typeof ownerState.direction === "object" && ownerState.direction[breakpoint] != null) {
            acc[breakpoint] = true;
          }
          return acc;
        }, {});
        const directionValues = resolveBreakpointValues({
          values: ownerState.direction,
          base
        });
        const spacingValues = resolveBreakpointValues({
          values: ownerState.spacing,
          base
        });
        if (typeof directionValues === "object") {
          Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
            const directionValue = directionValues[breakpoint];
            if (!directionValue) {
              const previousDirectionValue = index > 0 ? directionValues[breakpoints[index - 1]] : "column";
              directionValues[breakpoint] = previousDirectionValue;
            }
          });
        }
        const styleFromPropValue = (propValue, breakpoint) => {
          if (ownerState.useFlexGap) {
            return {
              gap: getValue(transformer, propValue)
            };
          }
          return {
            // The useFlexGap={false} implement relies on each child to give up control of the margin.
            // We need to reset the margin to avoid double spacing.
            "& > :not(style):not(style)": {
              margin: 0
            },
            "& > :not(style) ~ :not(style)": {
              [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue)
            }
          };
        };
        styles = deepmerge(styles, handleBreakpoints({
          theme
        }, spacingValues, styleFromPropValue));
      }
      styles = mergeBreakpointsInOrder(theme.breakpoints, styles);
      return styles;
    };
  }
});

// node_modules/@mui/system/Stack/Stack.js
var import_prop_types20, Stack;
var init_Stack = __esm({
  "node_modules/@mui/system/Stack/Stack.js"() {
    "use client";
    import_prop_types20 = __toESM(require_prop_types());
    init_createStack();
    Stack = createStack();
    true ? Stack.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * The content of the component.
       */
      children: import_prop_types20.default.node,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types20.default.elementType,
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'column'
       */
      direction: import_prop_types20.default.oneOfType([import_prop_types20.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types20.default.arrayOf(import_prop_types20.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types20.default.object]),
      /**
       * Add an element between each child.
       */
      divider: import_prop_types20.default.node,
      /**
       * Defines the space between immediate children.
       * @default 0
       */
      spacing: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.oneOfType([import_prop_types20.default.number, import_prop_types20.default.string])), import_prop_types20.default.number, import_prop_types20.default.object, import_prop_types20.default.string]),
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object, import_prop_types20.default.bool])), import_prop_types20.default.func, import_prop_types20.default.object]),
      /**
       * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
       *
       * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
       * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
       *
       * To enable this flag globally, follow the theme's default props configuration.
       * @default false
       */
      useFlexGap: import_prop_types20.default.bool
    } : void 0;
  }
});

// node_modules/@mui/system/Stack/StackProps.js
var init_StackProps = __esm({
  "node_modules/@mui/system/Stack/StackProps.js"() {
  }
});

// node_modules/@mui/system/Stack/stackClasses.js
var stackClasses;
var init_stackClasses = __esm({
  "node_modules/@mui/system/Stack/stackClasses.js"() {
    init_generateUtilityClasses2();
    init_generateUtilityClass2();
    stackClasses = generateUtilityClasses("MuiStack", ["root"]);
  }
});

// node_modules/@mui/system/Stack/index.js
var init_Stack2 = __esm({
  "node_modules/@mui/system/Stack/index.js"() {
    init_Stack();
    init_createStack();
    init_StackProps();
    init_stackClasses();
    init_stackClasses();
  }
});

// node_modules/@mui/system/index.js
var init_system = __esm({
  "node_modules/@mui/system/index.js"() {
    init_formatMuiErrorMessage2();
    init_styled_engine();
    init_GlobalStyles4();
    init_borders2();
    init_borders2();
    init_breakpoints2();
    init_cssContainerQueries2();
    init_breakpoints2();
    init_compose2();
    init_display2();
    init_flexbox2();
    init_flexbox2();
    init_cssGrid2();
    init_cssGrid2();
    init_palette2();
    init_palette2();
    init_positions2();
    init_positions2();
    init_shadows2();
    init_sizing2();
    init_sizing2();
    init_spacing2();
    init_spacing2();
    init_style2();
    init_typography2();
    init_typography2();
    init_styleFunctionSx2();
    init_getThemeValue2();
    init_Box2();
    init_createBox2();
    init_createStyled2();
    init_createStyled2();
    init_styled2();
    init_createTheme2();
    init_createBreakpoints();
    init_createSpacing();
    init_shape();
    init_useThemeProps2();
    init_useTheme2();
    init_useThemeWithoutDefault2();
    init_useMediaQuery2();
    init_colorManipulator2();
    init_ThemeProvider4();
    init_createCssVarsProvider();
    init_createGetCssVar();
    init_cssVarsParser();
    init_prepareCssVars();
    init_createCssVarsTheme();
    init_responsivePropType2();
    init_RtlProvider();
    init_RtlProvider();
    init_version();
    init_createContainer();
    init_Container2();
    init_Container2();
    init_Grid();
    init_Grid2();
    init_Stack();
    init_Stack2();
  }
});

// node_modules/@mui/material/styles/createMixins.js
function createMixins(breakpoints, mixins) {
  return {
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    },
    ...mixins
  };
}
var init_createMixins = __esm({
  "node_modules/@mui/material/styles/createMixins.js"() {
  }
});

// node_modules/@mui/material/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
function createTypography(palette2, typography2) {
  const {
    fontFamily: fontFamily2 = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize: fontSize2 = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2,
    ...other
  } = typeof typography2 === "function" ? typography2(palette2) : typography2;
  if (true) {
    if (typeof fontSize2 !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => ({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: lineHeight2,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...fontFamily2 === defaultFontFamily ? {
      letterSpacing: `${round(letterSpacing2 / size)}em`
    } : {},
    ...casing,
    ...allVariants
  });
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return deepmerge({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    ...variants
  }, other, {
    clone: false
    // No need to clone deep
  });
}
var caseAllCaps, defaultFontFamily;
var init_createTypography = __esm({
  "node_modules/@mui/material/styles/createTypography.js"() {
    init_deepmerge2();
    caseAllCaps = {
      textTransform: "uppercase"
    };
    defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
  }
});

// node_modules/@mui/material/styles/createTransitions.js
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.min(Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10), 3e3);
}
function createTransitions(inputTransitions) {
  const mergedEasing = {
    ...easing,
    ...inputTransitions.easing
  };
  const mergedDuration = {
    ...duration,
    ...inputTransitions.duration
  };
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0,
      ...other
    } = options;
    if (true) {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !Number.isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (typeof options !== "object") {
        console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join("\n"));
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return {
    getAutoHeightDuration,
    create,
    ...inputTransitions,
    easing: mergedEasing,
    duration: mergedDuration
  };
}
var easing, duration;
var init_createTransitions = __esm({
  "node_modules/@mui/material/styles/createTransitions.js"() {
    easing = {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    };
    duration = {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195
    };
  }
});

// node_modules/@mui/material/colors/common.js
var common, common_default;
var init_common = __esm({
  "node_modules/@mui/material/colors/common.js"() {
    common = {
      black: "#000",
      white: "#fff"
    };
    common_default = common;
  }
});

// node_modules/@mui/material/colors/grey.js
var grey, grey_default;
var init_grey = __esm({
  "node_modules/@mui/material/colors/grey.js"() {
    grey = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    };
    grey_default = grey;
  }
});

// node_modules/@mui/material/colors/purple.js
var purple, purple_default;
var init_purple = __esm({
  "node_modules/@mui/material/colors/purple.js"() {
    purple = {
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff"
    };
    purple_default = purple;
  }
});

// node_modules/@mui/material/colors/red.js
var red, red_default;
var init_red = __esm({
  "node_modules/@mui/material/colors/red.js"() {
    red = {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      A100: "#ff8a80",
      A200: "#ff5252",
      A400: "#ff1744",
      A700: "#d50000"
    };
    red_default = red;
  }
});

// node_modules/@mui/material/colors/orange.js
var orange, orange_default;
var init_orange = __esm({
  "node_modules/@mui/material/colors/orange.js"() {
    orange = {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      A100: "#ffd180",
      A200: "#ffab40",
      A400: "#ff9100",
      A700: "#ff6d00"
    };
    orange_default = orange;
  }
});

// node_modules/@mui/material/colors/blue.js
var blue, blue_default;
var init_blue = __esm({
  "node_modules/@mui/material/colors/blue.js"() {
    blue = {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff"
    };
    blue_default = blue;
  }
});

// node_modules/@mui/material/colors/lightBlue.js
var lightBlue, lightBlue_default;
var init_lightBlue = __esm({
  "node_modules/@mui/material/colors/lightBlue.js"() {
    lightBlue = {
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
      A100: "#80d8ff",
      A200: "#40c4ff",
      A400: "#00b0ff",
      A700: "#0091ea"
    };
    lightBlue_default = lightBlue;
  }
});

// node_modules/@mui/material/colors/green.js
var green, green_default;
var init_green = __esm({
  "node_modules/@mui/material/colors/green.js"() {
    green = {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      A100: "#b9f6ca",
      A200: "#69f0ae",
      A400: "#00e676",
      A700: "#00c853"
    };
    green_default = green;
  }
});

// node_modules/@mui/material/styles/createPalette.js
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = palette2;
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (true) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = {
      ...color2
    };
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes = {
    dark,
    light
  };
  if (true) {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge({
    // A collection of common colors.
    common: {
      ...common_default
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: "success"
    }),
    // The grey colors.
    grey: grey_default,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset,
    // The light and dark mode object.
    ...modes[mode]
  }, other);
  return paletteOutput;
}
var light, dark;
var init_createPalette = __esm({
  "node_modules/@mui/material/styles/createPalette.js"() {
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    init_colorManipulator2();
    init_common();
    init_grey();
    init_purple();
    init_red();
    init_orange();
    init_blue();
    init_lightBlue();
    init_green();
    light = {
      // The colors used to style the text.
      text: {
        // The most important text.
        primary: "rgba(0, 0, 0, 0.87)",
        // Secondary text.
        secondary: "rgba(0, 0, 0, 0.6)",
        // Disabled text have even lower visual prominence.
        disabled: "rgba(0, 0, 0, 0.38)"
      },
      // The color used to divide different elements.
      divider: "rgba(0, 0, 0, 0.12)",
      // The background colors used to style the surfaces.
      // Consistency between these values is important.
      background: {
        paper: common_default.white,
        default: common_default.white
      },
      // The colors used to style the action elements.
      action: {
        // The color of an active action like an icon button.
        active: "rgba(0, 0, 0, 0.54)",
        // The color of an hovered action.
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        // The color of a selected action.
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        // The color of a disabled action.
        disabled: "rgba(0, 0, 0, 0.26)",
        // The background color of a disabled action.
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12
      }
    };
    dark = {
      text: {
        primary: common_default.white,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
        paper: "#121212",
        default: "#121212"
      },
      action: {
        active: common_default.white,
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24
      }
    };
  }
});

// node_modules/@mui/material/styles/shadows.js
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadowKeyUmbraOpacity, shadowKeyPenumbraOpacity, shadowAmbientShadowOpacity, shadows, shadows_default2;
var init_shadows3 = __esm({
  "node_modules/@mui/material/styles/shadows.js"() {
    shadowKeyUmbraOpacity = 0.2;
    shadowKeyPenumbraOpacity = 0.14;
    shadowAmbientShadowOpacity = 0.12;
    shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
    shadows_default2 = shadows;
  }
});

// node_modules/@mui/material/styles/zIndex.js
var zIndex2, zIndex_default;
var init_zIndex = __esm({
  "node_modules/@mui/material/styles/zIndex.js"() {
    zIndex2 = {
      mobileStepper: 1e3,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
    };
    zIndex_default = zIndex2;
  }
});

// node_modules/@mui/material/styles/createThemeNoVars.js
function createThemeNoVars(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    ...other
  } = options;
  if (options.vars) {
    throw new Error(true ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : formatMuiErrorMessage(20));
  }
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows_default2.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: {
      ...zIndex_default
    }
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (true) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node2, component) => {
      let key;
      for (key in node2) {
        const child = node2[key];
        if (stateClasses.includes(key) && Object.keys(child).length > 0) {
          if (true) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node2, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node2[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.startsWith("Mui")) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = {
    ...defaultSxConfig_default,
    ...other == null ? void 0 : other.unstable_sxConfig
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
function createMuiTheme(...args) {
  if (true) {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(["MUI: the createMuiTheme function was renamed to createTheme.", "", "You should use `import { createTheme } from '@mui/material/styles'`"].join("\n"));
    }
  }
  return createThemeNoVars(...args);
}
var warnedOnce, createThemeNoVars_default;
var init_createThemeNoVars = __esm({
  "node_modules/@mui/material/styles/createThemeNoVars.js"() {
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_generateUtilityClass2();
    init_createMixins();
    init_createPalette();
    init_createTypography();
    init_shadows3();
    init_createTransitions();
    init_zIndex();
    warnedOnce = false;
    createThemeNoVars_default = createThemeNoVars;
  }
});

// node_modules/@mui/material/styles/getOverlayAlpha.js
function getOverlayAlpha(elevation) {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return Math.round(alphaValue * 10) / 1e3;
}
var init_getOverlayAlpha = __esm({
  "node_modules/@mui/material/styles/getOverlayAlpha.js"() {
  }
});

// node_modules/@mui/material/styles/createColorScheme.js
function getOpacity(mode) {
  return {
    inputPlaceholder: mode === "dark" ? 0.5 : 0.42,
    inputUnderline: mode === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: mode === "dark" ? 0.2 : 0.12,
    switchTrack: mode === "dark" ? 0.3 : 0.38
  };
}
function getOverlays(mode) {
  return mode === "dark" ? defaultDarkOverlays : [];
}
function createColorScheme(options) {
  const {
    palette: paletteInput = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity,
    overlays,
    ...rest
  } = options;
  const palette2 = createPalette(paletteInput);
  return {
    palette: palette2,
    opacity: {
      ...getOpacity(palette2.mode),
      ...opacity
    },
    overlays: overlays || getOverlays(palette2.mode),
    ...rest
  };
}
var defaultDarkOverlays;
var init_createColorScheme = __esm({
  "node_modules/@mui/material/styles/createColorScheme.js"() {
    init_createPalette();
    init_getOverlayAlpha();
    defaultDarkOverlays = [...Array(25)].map((_, index) => {
      if (index === 0) {
        return "none";
      }
      const overlay = getOverlayAlpha(index);
      return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
    });
  }
});

// node_modules/@mui/material/styles/shouldSkipGeneratingVar.js
function shouldSkipGeneratingVar(keys) {
  var _a;
  return !!keys[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!keys[0].match(/sxConfig$/) || // ends with sxConfig
  keys[0] === "palette" && !!((_a = keys[1]) == null ? void 0 : _a.match(/(mode|contrastThreshold|tonalOffset)/));
}
var init_shouldSkipGeneratingVar = __esm({
  "node_modules/@mui/material/styles/shouldSkipGeneratingVar.js"() {
  }
});

// node_modules/@mui/material/styles/excludeVariablesFromRoot.js
var excludeVariablesFromRoot, excludeVariablesFromRoot_default;
var init_excludeVariablesFromRoot = __esm({
  "node_modules/@mui/material/styles/excludeVariablesFromRoot.js"() {
    excludeVariablesFromRoot = (cssVarPrefix) => [...[...Array(25)].map((_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}overlays-${index}`), `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkBg`, `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkColor`];
    excludeVariablesFromRoot_default = excludeVariablesFromRoot;
  }
});

// node_modules/@mui/system/cssVars/prepareTypographyVars.js
function prepareTypographyVars(typography2) {
  const vars = {};
  const entries = Object.entries(typography2);
  entries.forEach((entry) => {
    const [key, value] = entry;
    if (typeof value === "object") {
      vars[key] = `${value.fontStyle ? `${value.fontStyle} ` : ""}${value.fontVariant ? `${value.fontVariant} ` : ""}${value.fontWeight ? `${value.fontWeight} ` : ""}${value.fontStretch ? `${value.fontStretch} ` : ""}${value.fontSize || ""}${value.lineHeight ? `/${value.lineHeight} ` : ""}${value.fontFamily || ""}`;
    }
  });
  return vars;
}
var init_prepareTypographyVars = __esm({
  "node_modules/@mui/system/cssVars/prepareTypographyVars.js"() {
  }
});

// node_modules/@mui/system/cssVars/index.js
var init_cssVars = __esm({
  "node_modules/@mui/system/cssVars/index.js"() {
    init_createCssVarsProvider();
    init_prepareCssVars();
    init_prepareTypographyVars();
    init_createCssVarsTheme();
    init_getColorSchemeSelector();
  }
});

// node_modules/@mui/material/styles/createGetSelector.js
var createGetSelector_default;
var init_createGetSelector = __esm({
  "node_modules/@mui/material/styles/createGetSelector.js"() {
    init_excludeVariablesFromRoot();
    createGetSelector_default = (theme) => (colorScheme, css2) => {
      const root = theme.rootSelector || ":root";
      const selector = theme.colorSchemeSelector;
      let rule = selector;
      if (selector === "class") {
        rule = ".%s";
      }
      if (selector === "data") {
        rule = "[data-%s]";
      }
      if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
        rule = `[${selector}="%s"]`;
      }
      if (theme.defaultColorScheme === colorScheme) {
        if (colorScheme === "dark") {
          const excludedVariables = {};
          excludeVariablesFromRoot_default(theme.cssVarPrefix).forEach((cssVar) => {
            excludedVariables[cssVar] = css2[cssVar];
            delete css2[cssVar];
          });
          if (rule === "media") {
            return {
              [root]: css2,
              [`@media (prefers-color-scheme: dark)`]: {
                [root]: excludedVariables
              }
            };
          }
          if (rule) {
            return {
              [rule.replace("%s", colorScheme)]: excludedVariables,
              [`${root}, ${rule.replace("%s", colorScheme)}`]: css2
            };
          }
          return {
            [root]: {
              ...css2,
              ...excludedVariables
            }
          };
        }
        if (rule && rule !== "media") {
          return `${root}, ${rule.replace("%s", String(colorScheme))}`;
        }
      } else if (colorScheme) {
        if (rule === "media") {
          return {
            [`@media (prefers-color-scheme: ${String(colorScheme)})`]: {
              [root]: css2
            }
          };
        }
        if (rule) {
          return rule.replace("%s", String(colorScheme));
        }
      }
      return root;
    };
  }
});

// node_modules/@mui/material/styles/stringifyTheme.js
function isSerializable(val) {
  return isPlainObject(val) || typeof val === "undefined" || typeof val === "string" || typeof val === "boolean" || typeof val === "number" || Array.isArray(val);
}
function stringifyTheme(baseTheme = {}) {
  const serializableTheme = {
    ...baseTheme
  };
  function serializeTheme(object) {
    const array = Object.entries(object);
    for (let index = 0; index < array.length; index++) {
      const [key, value] = array[index];
      if (!isSerializable(value) || key.startsWith("unstable_")) {
        delete object[key];
      } else if (isPlainObject(value)) {
        object[key] = {
          ...value
        };
        serializeTheme(object[key]);
      }
    }
  }
  serializeTheme(serializableTheme);
  return `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(serializableTheme, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
var init_stringifyTheme = __esm({
  "node_modules/@mui/material/styles/stringifyTheme.js"() {
    init_deepmerge2();
  }
});

// node_modules/@mui/material/styles/createThemeWithVars.js
function assignNode(obj, keys) {
  keys.forEach((k) => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}
function setColor(obj, key, defaultValue) {
  if (!obj[key] && defaultValue) {
    obj[key] = defaultValue;
  }
}
function toRgb(color2) {
  if (!color2 || !color2.startsWith("hsl")) {
    return color2;
  }
  return hslToRgb(color2);
}
function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    obj[`${key}Channel`] = private_safeColorChannel(toRgb(obj[key]), `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`);
  }
}
function getSpacingVal(spacingInput) {
  if (typeof spacingInput === "number") {
    return `${spacingInput}px`;
  }
  if (typeof spacingInput === "string" || typeof spacingInput === "function" || Array.isArray(spacingInput)) {
    return spacingInput;
  }
  return "8px";
}
function attachColorScheme(colorSchemes, scheme, restTheme, colorScheme) {
  if (!scheme) {
    return void 0;
  }
  scheme = scheme === true ? {} : scheme;
  const mode = colorScheme === "dark" ? "dark" : "light";
  if (!restTheme) {
    colorSchemes[colorScheme] = createColorScheme({
      ...scheme,
      palette: {
        mode,
        ...scheme == null ? void 0 : scheme.palette
      }
    });
    return void 0;
  }
  const {
    palette: palette2,
    ...muiTheme
  } = createThemeNoVars_default({
    ...restTheme,
    palette: {
      mode,
      ...scheme == null ? void 0 : scheme.palette
    }
  });
  colorSchemes[colorScheme] = {
    ...scheme,
    palette: palette2,
    opacity: {
      ...getOpacity(mode),
      ...scheme == null ? void 0 : scheme.opacity
    },
    overlays: (scheme == null ? void 0 : scheme.overlays) || getOverlays(mode)
  };
  return muiTheme;
}
function createThemeWithVars(options = {}, ...args) {
  const {
    colorSchemes: colorSchemesInput = {
      light: true
    },
    defaultColorScheme: defaultColorSchemeInput,
    disableCssColorScheme = false,
    cssVarPrefix = "mui",
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2 = shouldSkipGeneratingVar,
    colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark ? "media" : void 0,
    rootSelector = ":root",
    ...input
  } = options;
  const firstColorScheme = Object.keys(colorSchemesInput)[0];
  const defaultColorScheme = defaultColorSchemeInput || (colorSchemesInput.light && firstColorScheme !== "light" ? "light" : firstColorScheme);
  const getCssVar = createGetCssVar2(cssVarPrefix);
  const {
    [defaultColorScheme]: defaultSchemeInput,
    light: builtInLight,
    dark: builtInDark,
    ...customColorSchemes
  } = colorSchemesInput;
  const colorSchemes = {
    ...customColorSchemes
  };
  let defaultScheme = defaultSchemeInput;
  if (defaultColorScheme === "dark" && !("dark" in colorSchemesInput) || defaultColorScheme === "light" && !("light" in colorSchemesInput)) {
    defaultScheme = true;
  }
  if (!defaultScheme) {
    throw new Error(true ? `MUI: The \`colorSchemes.${defaultColorScheme}\` option is either missing or invalid.` : formatMuiErrorMessage(21, defaultColorScheme));
  }
  const muiTheme = attachColorScheme(colorSchemes, defaultScheme, input, defaultColorScheme);
  if (builtInLight && !colorSchemes.light) {
    attachColorScheme(colorSchemes, builtInLight, void 0, "light");
  }
  if (builtInDark && !colorSchemes.dark) {
    attachColorScheme(colorSchemes, builtInDark, void 0, "dark");
  }
  let theme = {
    defaultColorScheme,
    ...muiTheme,
    cssVarPrefix,
    colorSchemeSelector: selector,
    rootSelector,
    getCssVar,
    colorSchemes,
    font: {
      ...prepareTypographyVars(muiTheme.typography),
      ...muiTheme.font
    },
    spacing: getSpacingVal(input.spacing)
  };
  Object.keys(theme.colorSchemes).forEach((key) => {
    const palette2 = theme.colorSchemes[key].palette;
    const setCssVarColor = (cssVar) => {
      const tokens = cssVar.split("-");
      const color2 = tokens[1];
      const colorToken = tokens[2];
      return getCssVar(cssVar, palette2[color2][colorToken]);
    };
    if (palette2.mode === "light") {
      setColor(palette2.common, "background", "#fff");
      setColor(palette2.common, "onBackground", "#000");
    }
    if (palette2.mode === "dark") {
      setColor(palette2.common, "background", "#000");
      setColor(palette2.common, "onBackground", "#fff");
    }
    assignNode(palette2, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]);
    if (palette2.mode === "light") {
      setColor(palette2.Alert, "errorColor", private_safeDarken(palette2.error.light, 0.6));
      setColor(palette2.Alert, "infoColor", private_safeDarken(palette2.info.light, 0.6));
      setColor(palette2.Alert, "successColor", private_safeDarken(palette2.success.light, 0.6));
      setColor(palette2.Alert, "warningColor", private_safeDarken(palette2.warning.light, 0.6));
      setColor(palette2.Alert, "errorFilledBg", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoFilledBg", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successFilledBg", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningFilledBg", setCssVarColor("palette-warning-main"));
      setColor(palette2.Alert, "errorFilledColor", silent(() => palette2.getContrastText(palette2.error.main)));
      setColor(palette2.Alert, "infoFilledColor", silent(() => palette2.getContrastText(palette2.info.main)));
      setColor(palette2.Alert, "successFilledColor", silent(() => palette2.getContrastText(palette2.success.main)));
      setColor(palette2.Alert, "warningFilledColor", silent(() => palette2.getContrastText(palette2.warning.main)));
      setColor(palette2.Alert, "errorStandardBg", private_safeLighten(palette2.error.light, 0.9));
      setColor(palette2.Alert, "infoStandardBg", private_safeLighten(palette2.info.light, 0.9));
      setColor(palette2.Alert, "successStandardBg", private_safeLighten(palette2.success.light, 0.9));
      setColor(palette2.Alert, "warningStandardBg", private_safeLighten(palette2.warning.light, 0.9));
      setColor(palette2.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette2.AppBar, "defaultBg", setCssVarColor("palette-grey-100"));
      setColor(palette2.Avatar, "defaultBg", setCssVarColor("palette-grey-400"));
      setColor(palette2.Button, "inheritContainedBg", setCssVarColor("palette-grey-300"));
      setColor(palette2.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-A100"));
      setColor(palette2.Chip, "defaultBorder", setCssVarColor("palette-grey-400"));
      setColor(palette2.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultIconColor", setCssVarColor("palette-grey-700"));
      setColor(palette2.FilledInput, "bg", "rgba(0, 0, 0, 0.06)");
      setColor(palette2.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)");
      setColor(palette2.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)");
      setColor(palette2.LinearProgress, "primaryBg", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.LinearProgress, "secondaryBg", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.LinearProgress, "errorBg", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.LinearProgress, "infoBg", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.LinearProgress, "successBg", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.LinearProgress, "warningBg", private_safeLighten(palette2.warning.main, 0.62));
      setColor(palette2.Skeleton, "bg", `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.11)`);
      setColor(palette2.Slider, "primaryTrack", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.Slider, "secondaryTrack", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.Slider, "errorTrack", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.Slider, "infoTrack", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.Slider, "successTrack", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.Slider, "warningTrack", private_safeLighten(palette2.warning.main, 0.62));
      const snackbarContentBackground = private_safeEmphasize(palette2.background.default, 0.8);
      setColor(palette2.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette2.SnackbarContent, "color", silent(() => palette2.getContrastText(snackbarContentBackground)));
      setColor(palette2.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette2.background.paper, 0.15));
      setColor(palette2.StepConnector, "border", setCssVarColor("palette-grey-400"));
      setColor(palette2.StepContent, "border", setCssVarColor("palette-grey-400"));
      setColor(palette2.Switch, "defaultColor", setCssVarColor("palette-common-white"));
      setColor(palette2.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-100"));
      setColor(palette2.Switch, "primaryDisabledColor", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.Switch, "secondaryDisabledColor", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.Switch, "errorDisabledColor", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.Switch, "infoDisabledColor", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.Switch, "successDisabledColor", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.Switch, "warningDisabledColor", private_safeLighten(palette2.warning.main, 0.62));
      setColor(palette2.TableCell, "border", private_safeLighten(private_safeAlpha(palette2.divider, 1), 0.88));
      setColor(palette2.Tooltip, "bg", private_safeAlpha(palette2.grey[700], 0.92));
    }
    if (palette2.mode === "dark") {
      setColor(palette2.Alert, "errorColor", private_safeLighten(palette2.error.light, 0.6));
      setColor(palette2.Alert, "infoColor", private_safeLighten(palette2.info.light, 0.6));
      setColor(palette2.Alert, "successColor", private_safeLighten(palette2.success.light, 0.6));
      setColor(palette2.Alert, "warningColor", private_safeLighten(palette2.warning.light, 0.6));
      setColor(palette2.Alert, "errorFilledBg", setCssVarColor("palette-error-dark"));
      setColor(palette2.Alert, "infoFilledBg", setCssVarColor("palette-info-dark"));
      setColor(palette2.Alert, "successFilledBg", setCssVarColor("palette-success-dark"));
      setColor(palette2.Alert, "warningFilledBg", setCssVarColor("palette-warning-dark"));
      setColor(palette2.Alert, "errorFilledColor", silent(() => palette2.getContrastText(palette2.error.dark)));
      setColor(palette2.Alert, "infoFilledColor", silent(() => palette2.getContrastText(palette2.info.dark)));
      setColor(palette2.Alert, "successFilledColor", silent(() => palette2.getContrastText(palette2.success.dark)));
      setColor(palette2.Alert, "warningFilledColor", silent(() => palette2.getContrastText(palette2.warning.dark)));
      setColor(palette2.Alert, "errorStandardBg", private_safeDarken(palette2.error.light, 0.9));
      setColor(palette2.Alert, "infoStandardBg", private_safeDarken(palette2.info.light, 0.9));
      setColor(palette2.Alert, "successStandardBg", private_safeDarken(palette2.success.light, 0.9));
      setColor(palette2.Alert, "warningStandardBg", private_safeDarken(palette2.warning.light, 0.9));
      setColor(palette2.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette2.AppBar, "defaultBg", setCssVarColor("palette-grey-900"));
      setColor(palette2.AppBar, "darkBg", setCssVarColor("palette-background-paper"));
      setColor(palette2.AppBar, "darkColor", setCssVarColor("palette-text-primary"));
      setColor(palette2.Avatar, "defaultBg", setCssVarColor("palette-grey-600"));
      setColor(palette2.Button, "inheritContainedBg", setCssVarColor("palette-grey-800"));
      setColor(palette2.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultBorder", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.Chip, "defaultIconColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.FilledInput, "bg", "rgba(255, 255, 255, 0.09)");
      setColor(palette2.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)");
      setColor(palette2.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)");
      setColor(palette2.LinearProgress, "primaryBg", private_safeDarken(palette2.primary.main, 0.5));
      setColor(palette2.LinearProgress, "secondaryBg", private_safeDarken(palette2.secondary.main, 0.5));
      setColor(palette2.LinearProgress, "errorBg", private_safeDarken(palette2.error.main, 0.5));
      setColor(palette2.LinearProgress, "infoBg", private_safeDarken(palette2.info.main, 0.5));
      setColor(palette2.LinearProgress, "successBg", private_safeDarken(palette2.success.main, 0.5));
      setColor(palette2.LinearProgress, "warningBg", private_safeDarken(palette2.warning.main, 0.5));
      setColor(palette2.Skeleton, "bg", `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.13)`);
      setColor(palette2.Slider, "primaryTrack", private_safeDarken(palette2.primary.main, 0.5));
      setColor(palette2.Slider, "secondaryTrack", private_safeDarken(palette2.secondary.main, 0.5));
      setColor(palette2.Slider, "errorTrack", private_safeDarken(palette2.error.main, 0.5));
      setColor(palette2.Slider, "infoTrack", private_safeDarken(palette2.info.main, 0.5));
      setColor(palette2.Slider, "successTrack", private_safeDarken(palette2.success.main, 0.5));
      setColor(palette2.Slider, "warningTrack", private_safeDarken(palette2.warning.main, 0.5));
      const snackbarContentBackground = private_safeEmphasize(palette2.background.default, 0.98);
      setColor(palette2.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette2.SnackbarContent, "color", silent(() => palette2.getContrastText(snackbarContentBackground)));
      setColor(palette2.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette2.background.paper, 0.15));
      setColor(palette2.StepConnector, "border", setCssVarColor("palette-grey-600"));
      setColor(palette2.StepContent, "border", setCssVarColor("palette-grey-600"));
      setColor(palette2.Switch, "defaultColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-600"));
      setColor(palette2.Switch, "primaryDisabledColor", private_safeDarken(palette2.primary.main, 0.55));
      setColor(palette2.Switch, "secondaryDisabledColor", private_safeDarken(palette2.secondary.main, 0.55));
      setColor(palette2.Switch, "errorDisabledColor", private_safeDarken(palette2.error.main, 0.55));
      setColor(palette2.Switch, "infoDisabledColor", private_safeDarken(palette2.info.main, 0.55));
      setColor(palette2.Switch, "successDisabledColor", private_safeDarken(palette2.success.main, 0.55));
      setColor(palette2.Switch, "warningDisabledColor", private_safeDarken(palette2.warning.main, 0.55));
      setColor(palette2.TableCell, "border", private_safeDarken(private_safeAlpha(palette2.divider, 1), 0.68));
      setColor(palette2.Tooltip, "bg", private_safeAlpha(palette2.grey[700], 0.92));
    }
    setColorChannel(palette2.background, "default");
    setColorChannel(palette2.background, "paper");
    setColorChannel(palette2.common, "background");
    setColorChannel(palette2.common, "onBackground");
    setColorChannel(palette2, "divider");
    Object.keys(palette2).forEach((color2) => {
      const colors = palette2[color2];
      if (colors && typeof colors === "object") {
        if (colors.main) {
          setColor(palette2[color2], "mainChannel", private_safeColorChannel(toRgb(colors.main)));
        }
        if (colors.light) {
          setColor(palette2[color2], "lightChannel", private_safeColorChannel(toRgb(colors.light)));
        }
        if (colors.dark) {
          setColor(palette2[color2], "darkChannel", private_safeColorChannel(toRgb(colors.dark)));
        }
        if (colors.contrastText) {
          setColor(palette2[color2], "contrastTextChannel", private_safeColorChannel(toRgb(colors.contrastText)));
        }
        if (color2 === "text") {
          setColorChannel(palette2[color2], "primary");
          setColorChannel(palette2[color2], "secondary");
        }
        if (color2 === "action") {
          if (colors.active) {
            setColorChannel(palette2[color2], "active");
          }
          if (colors.selected) {
            setColorChannel(palette2[color2], "selected");
          }
        }
      }
    });
  });
  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);
  const parserConfig = {
    prefix: cssVarPrefix,
    disableCssColorScheme,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2,
    getSelector: createGetSelector_default(theme)
  };
  const {
    vars,
    generateThemeVars,
    generateStyleSheets
  } = prepareCssVars_default(theme, parserConfig);
  theme.vars = vars;
  Object.entries(theme.colorSchemes[theme.defaultColorScheme]).forEach(([key, value]) => {
    theme[key] = value;
  });
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.generateSpacing = function generateSpacing() {
    return createSpacing(input.spacing, createUnarySpacing(this));
  };
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.spacing = theme.generateSpacing();
  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar2;
  theme.unstable_sxConfig = {
    ...defaultSxConfig_default,
    ...input == null ? void 0 : input.unstable_sxConfig
  };
  theme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  theme.toRuntimeSource = stringifyTheme;
  return theme;
}
var silent, createGetCssVar2;
var init_createThemeWithVars = __esm({
  "node_modules/@mui/material/styles/createThemeWithVars.js"() {
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    init_system();
    init_spacing2();
    init_cssVars();
    init_styleFunctionSx2();
    init_colorManipulator2();
    init_createThemeNoVars();
    init_createColorScheme();
    init_shouldSkipGeneratingVar();
    init_createGetSelector();
    init_stringifyTheme();
    silent = (fn) => {
      try {
        return fn();
      } catch (error) {
      }
      return void 0;
    };
    createGetCssVar2 = (cssVarPrefix = "mui") => createGetCssVar(cssVarPrefix);
  }
});

// node_modules/@mui/material/styles/createTheme.js
function attachColorScheme2(theme, scheme, colorScheme) {
  if (!theme.colorSchemes) {
    return void 0;
  }
  if (colorScheme) {
    theme.colorSchemes[scheme] = {
      ...colorScheme !== true && colorScheme,
      palette: createPalette({
        ...colorScheme === true ? {} : colorScheme.palette,
        mode: scheme
      })
      // cast type to skip module augmentation test
    };
  }
}
function createTheme2(options = {}, ...args) {
  const {
    palette: palette2,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette2 ? {
      light: true
    } : void 0,
    defaultColorScheme: initialDefaultColorScheme = palette2 == null ? void 0 : palette2.mode,
    ...rest
  } = options;
  const defaultColorSchemeInput = initialDefaultColorScheme || "light";
  const defaultScheme = initialColorSchemes == null ? void 0 : initialColorSchemes[defaultColorSchemeInput];
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...palette2 ? {
      [defaultColorSchemeInput]: {
        ...typeof defaultScheme !== "boolean" && defaultScheme,
        palette: palette2
      }
    } : void 0
  };
  if (cssVariables === false) {
    if (!("colorSchemes" in options)) {
      return createThemeNoVars_default(options, ...args);
    }
    let paletteOptions = palette2;
    if (!("palette" in options)) {
      if (colorSchemesInput[defaultColorSchemeInput]) {
        if (colorSchemesInput[defaultColorSchemeInput] !== true) {
          paletteOptions = colorSchemesInput[defaultColorSchemeInput].palette;
        } else if (defaultColorSchemeInput === "dark") {
          paletteOptions = {
            mode: "dark"
          };
        }
      }
    }
    const theme = createThemeNoVars_default({
      ...options,
      palette: paletteOptions
    }, ...args);
    theme.defaultColorScheme = defaultColorSchemeInput;
    theme.colorSchemes = colorSchemesInput;
    if (theme.palette.mode === "light") {
      theme.colorSchemes.light = {
        ...colorSchemesInput.light !== true && colorSchemesInput.light,
        palette: theme.palette
      };
      attachColorScheme2(theme, "dark", colorSchemesInput.dark);
    }
    if (theme.palette.mode === "dark") {
      theme.colorSchemes.dark = {
        ...colorSchemesInput.dark !== true && colorSchemesInput.dark,
        palette: theme.palette
      };
      attachColorScheme2(theme, "light", colorSchemesInput.light);
    }
    return theme;
  }
  if (!palette2 && !("light" in colorSchemesInput) && defaultColorSchemeInput === "light") {
    colorSchemesInput.light = true;
  }
  return createThemeWithVars({
    ...rest,
    colorSchemes: colorSchemesInput,
    defaultColorScheme: defaultColorSchemeInput,
    ...typeof cssVariables !== "boolean" && cssVariables
  }, ...args);
}
var init_createTheme3 = __esm({
  "node_modules/@mui/material/styles/createTheme.js"() {
    init_createPalette();
    init_createThemeWithVars();
    init_createThemeNoVars();
    init_createThemeNoVars();
  }
});

// node_modules/@mui/material/styles/identifier.js
var identifier_default;
var init_identifier = __esm({
  "node_modules/@mui/material/styles/identifier.js"() {
    identifier_default = "$$material";
  }
});

// node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme4, defaultTheme_default;
var init_defaultTheme = __esm({
  "node_modules/@mui/material/styles/defaultTheme.js"() {
    "use client";
    init_createTheme3();
    defaultTheme4 = createTheme2();
    defaultTheme_default = defaultTheme4;
  }
});

// node_modules/@mui/material/styles/useTheme.js
function useTheme5() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React34.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}
var React34;
var init_useTheme5 = __esm({
  "node_modules/@mui/material/styles/useTheme.js"() {
    "use client";
    React34 = __toESM(require_react());
    init_system();
    init_defaultTheme();
    init_identifier();
  }
});

// node_modules/@mui/material/GlobalStyles/GlobalStyles.js
function GlobalStyles3(props) {
  return (0, import_jsx_runtime14.jsx)(GlobalStyles_default, {
    ...props,
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  });
}
var React35, import_prop_types21, import_jsx_runtime14, GlobalStyles_default2;
var init_GlobalStyles5 = __esm({
  "node_modules/@mui/material/GlobalStyles/GlobalStyles.js"() {
    "use client";
    React35 = __toESM(require_react());
    import_prop_types21 = __toESM(require_prop_types());
    init_system();
    init_defaultTheme();
    init_identifier();
    import_jsx_runtime14 = __toESM(require_jsx_runtime());
    true ? GlobalStyles3.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * The styles you want to apply globally.
       */
      styles: import_prop_types21.default.oneOfType([import_prop_types21.default.array, import_prop_types21.default.func, import_prop_types21.default.number, import_prop_types21.default.object, import_prop_types21.default.string, import_prop_types21.default.bool])
    } : void 0;
    GlobalStyles_default2 = GlobalStyles3;
  }
});

// node_modules/@mui/material/GlobalStyles/index.js
var init_GlobalStyles6 = __esm({
  "node_modules/@mui/material/GlobalStyles/index.js"() {
    init_GlobalStyles5();
  }
});

// node_modules/@mui/material/styles/slotShouldForwardProp.js
function slotShouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
var slotShouldForwardProp_default;
var init_slotShouldForwardProp = __esm({
  "node_modules/@mui/material/styles/slotShouldForwardProp.js"() {
    slotShouldForwardProp_default = slotShouldForwardProp;
  }
});

// node_modules/@mui/material/styles/rootShouldForwardProp.js
var rootShouldForwardProp, rootShouldForwardProp_default;
var init_rootShouldForwardProp = __esm({
  "node_modules/@mui/material/styles/rootShouldForwardProp.js"() {
    init_slotShouldForwardProp();
    rootShouldForwardProp = (prop) => slotShouldForwardProp_default(prop) && prop !== "classes";
    rootShouldForwardProp_default = rootShouldForwardProp;
  }
});

// node_modules/@mui/material/styles/styled.js
var styled3, styled_default2;
var init_styled3 = __esm({
  "node_modules/@mui/material/styles/styled.js"() {
    "use client";
    init_createStyled2();
    init_defaultTheme();
    init_identifier();
    init_rootShouldForwardProp();
    init_slotShouldForwardProp();
    init_rootShouldForwardProp();
    styled3 = createStyled3({
      themeId: identifier_default,
      defaultTheme: defaultTheme_default,
      rootShouldForwardProp: rootShouldForwardProp_default
    });
    styled_default2 = styled3;
  }
});

// node_modules/@mui/material/utils/memoTheme.js
function memoTheme(styleFn) {
  let lastValue;
  let lastTheme;
  return (props) => {
    let value = lastValue;
    if (value === void 0 || props.theme !== lastTheme) {
      arg.theme = props.theme;
      value = styleFn(arg);
      lastValue = value;
      lastTheme = props.theme;
    }
    return value;
  };
}
var arg;
var init_memoTheme = __esm({
  "node_modules/@mui/material/utils/memoTheme.js"() {
    arg = {
      theme: void 0
    };
  }
});

// node_modules/@mui/material/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses, svgIconClasses_default;
var init_svgIconClasses = __esm({
  "node_modules/@mui/material/SvgIcon/svgIconClasses.js"() {
    init_generateUtilityClasses2();
    init_generateUtilityClass2();
    svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
    svgIconClasses_default = svgIconClasses;
  }
});

// node_modules/@mui/material/zero-styled/index.js
function globalCss(styles) {
  return function GlobalStylesWrapper(props) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      (0, import_jsx_runtime15.jsx)(GlobalStyles_default2, {
        styles: typeof styles === "function" ? (theme) => styles({
          theme,
          ...props
        }) : styles
      })
    );
  };
}
function internal_createExtendSxProp() {
  return extendSxProp;
}
var React36, import_jsx_runtime15;
var init_zero_styled = __esm({
  "node_modules/@mui/material/zero-styled/index.js"() {
    React36 = __toESM(require_react());
    init_styleFunctionSx2();
    init_useTheme5();
    init_GlobalStyles6();
    import_jsx_runtime15 = __toESM(require_jsx_runtime());
    init_system();
    init_styled3();
  }
});

// node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js
function DefaultPropsProvider2(props) {
  return (0, import_jsx_runtime16.jsx)(DefaultPropsProvider_default, {
    ...props
  });
}
function useDefaultProps2(params) {
  return useDefaultProps(params);
}
var React37, import_prop_types22, import_jsx_runtime16;
var init_DefaultPropsProvider3 = __esm({
  "node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"() {
    "use client";
    React37 = __toESM(require_react());
    import_prop_types22 = __toESM(require_prop_types());
    init_DefaultPropsProvider2();
    import_jsx_runtime16 = __toESM(require_jsx_runtime());
    true ? DefaultPropsProvider2.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types22.default.node,
      /**
       * @ignore
       */
      value: import_prop_types22.default.object.isRequired
    } : void 0;
  }
});

// node_modules/@mui/material/DefaultPropsProvider/index.js
var init_DefaultPropsProvider4 = __esm({
  "node_modules/@mui/material/DefaultPropsProvider/index.js"() {
    init_DefaultPropsProvider3();
  }
});

// node_modules/@mui/material/SvgIcon/SvgIcon.js
var React38, import_prop_types23, import_jsx_runtime17, useUtilityClasses2, SvgIconRoot, SvgIcon, SvgIcon_default;
var init_SvgIcon = __esm({
  "node_modules/@mui/material/SvgIcon/SvgIcon.js"() {
    "use client";
    React38 = __toESM(require_react());
    import_prop_types23 = __toESM(require_prop_types());
    init_clsx();
    init_composeClasses2();
    init_capitalize3();
    init_zero_styled();
    init_memoTheme();
    init_DefaultPropsProvider4();
    init_svgIconClasses();
    import_jsx_runtime17 = __toESM(require_jsx_runtime());
    useUtilityClasses2 = (ownerState) => {
      const {
        color: color2,
        fontSize: fontSize2,
        classes
      } = ownerState;
      const slots = {
        root: ["root", color2 !== "inherit" && `color${capitalize_default(color2)}`, `fontSize${capitalize_default(fontSize2)}`]
      };
      return composeClasses(slots, getSvgIconUtilityClass, classes);
    };
    SvgIconRoot = styled_default2("svg", {
      name: "MuiSvgIcon",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, ownerState.color !== "inherit" && styles[`color${capitalize_default(ownerState.color)}`], styles[`fontSize${capitalize_default(ownerState.fontSize)}`]];
      }
    })(memoTheme(({
      theme
    }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      return {
        userSelect: "none",
        width: "1em",
        height: "1em",
        display: "inline-block",
        flexShrink: 0,
        transition: (_d = (_a = theme.transitions) == null ? void 0 : _a.create) == null ? void 0 : _d.call(_a, "fill", {
          duration: (_c = (_b = (theme.vars ?? theme).transitions) == null ? void 0 : _b.duration) == null ? void 0 : _c.shorter
        }),
        variants: [
          {
            props: (props) => !props.hasSvgAsChild,
            style: {
              // the <svg> will define the property that has `currentColor`
              // for example heroicons uses fill="none" and stroke="currentColor"
              fill: "currentColor"
            }
          },
          {
            props: {
              fontSize: "inherit"
            },
            style: {
              fontSize: "inherit"
            }
          },
          {
            props: {
              fontSize: "small"
            },
            style: {
              fontSize: ((_f = (_e = theme.typography) == null ? void 0 : _e.pxToRem) == null ? void 0 : _f.call(_e, 20)) || "1.25rem"
            }
          },
          {
            props: {
              fontSize: "medium"
            },
            style: {
              fontSize: ((_h = (_g = theme.typography) == null ? void 0 : _g.pxToRem) == null ? void 0 : _h.call(_g, 24)) || "1.5rem"
            }
          },
          {
            props: {
              fontSize: "large"
            },
            style: {
              fontSize: ((_j = (_i = theme.typography) == null ? void 0 : _i.pxToRem) == null ? void 0 : _j.call(_i, 35)) || "2.1875rem"
            }
          },
          // TODO v5 deprecate color prop, v6 remove for sx
          ...Object.entries((theme.vars ?? theme).palette).filter(([, value]) => value && value.main).map(([color2]) => {
            var _a2, _b2;
            return {
              props: {
                color: color2
              },
              style: {
                color: (_b2 = (_a2 = (theme.vars ?? theme).palette) == null ? void 0 : _a2[color2]) == null ? void 0 : _b2.main
              }
            };
          }),
          {
            props: {
              color: "action"
            },
            style: {
              color: (_l = (_k = (theme.vars ?? theme).palette) == null ? void 0 : _k.action) == null ? void 0 : _l.active
            }
          },
          {
            props: {
              color: "disabled"
            },
            style: {
              color: (_n = (_m = (theme.vars ?? theme).palette) == null ? void 0 : _m.action) == null ? void 0 : _n.disabled
            }
          },
          {
            props: {
              color: "inherit"
            },
            style: {
              color: void 0
            }
          }
        ]
      };
    }));
    SvgIcon = React38.forwardRef(function SvgIcon2(inProps, ref) {
      const props = useDefaultProps2({
        props: inProps,
        name: "MuiSvgIcon"
      });
      const {
        children,
        className,
        color: color2 = "inherit",
        component = "svg",
        fontSize: fontSize2 = "medium",
        htmlColor,
        inheritViewBox = false,
        titleAccess,
        viewBox = "0 0 24 24",
        ...other
      } = props;
      const hasSvgAsChild = React38.isValidElement(children) && children.type === "svg";
      const ownerState = {
        ...props,
        color: color2,
        component,
        fontSize: fontSize2,
        instanceFontSize: inProps.fontSize,
        inheritViewBox,
        viewBox,
        hasSvgAsChild
      };
      const more = {};
      if (!inheritViewBox) {
        more.viewBox = viewBox;
      }
      const classes = useUtilityClasses2(ownerState);
      return (0, import_jsx_runtime17.jsxs)(SvgIconRoot, {
        as: component,
        className: clsx_default(classes.root, className),
        focusable: "false",
        color: htmlColor,
        "aria-hidden": titleAccess ? void 0 : true,
        role: titleAccess ? "img" : void 0,
        ref,
        ...more,
        ...other,
        ...hasSvgAsChild && children.props,
        ownerState,
        children: [hasSvgAsChild ? children.props.children : children, titleAccess ? (0, import_jsx_runtime17.jsx)("title", {
          children: titleAccess
        }) : null]
      });
    });
    true ? SvgIcon.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * Node passed into the SVG element.
       */
      children: import_prop_types23.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types23.default.object,
      /**
       * @ignore
       */
      className: import_prop_types23.default.string,
      /**
       * The color of the component.
       * It supports both default and custom theme colors, which can be added as shown in the
       * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
       * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
       * @default 'inherit'
       */
      color: import_prop_types23.default.oneOfType([import_prop_types23.default.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types23.default.string]),
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types23.default.elementType,
      /**
       * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
       * @default 'medium'
       */
      fontSize: import_prop_types23.default.oneOfType([import_prop_types23.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types23.default.string]),
      /**
       * Applies a color attribute to the SVG element.
       */
      htmlColor: import_prop_types23.default.string,
      /**
       * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
       * prop will be ignored.
       * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
       * `component`'s viewBox to the root node.
       * @default false
       */
      inheritViewBox: import_prop_types23.default.bool,
      /**
       * The shape-rendering attribute. The behavior of the different options is described on the
       * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
       * If you are having issues with blurry icons you should investigate this prop.
       */
      shapeRendering: import_prop_types23.default.string,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types23.default.oneOfType([import_prop_types23.default.arrayOf(import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object, import_prop_types23.default.bool])), import_prop_types23.default.func, import_prop_types23.default.object]),
      /**
       * Provides a human-readable title for the element that contains it.
       * https://www.w3.org/TR/SVG-access/#Equivalent
       */
      titleAccess: import_prop_types23.default.string,
      /**
       * Allows you to redefine what the coordinates without units mean inside an SVG element.
       * For example, if the SVG element is 500 (width) by 200 (height),
       * and you pass viewBox="0 0 50 20",
       * this means that the coordinates inside the SVG will go from the top left corner (0,0)
       * to bottom right (50,20) and each unit will be worth 10px.
       * @default '0 0 24 24'
       */
      viewBox: import_prop_types23.default.string
    } : void 0;
    if (SvgIcon) {
      SvgIcon.muiName = "SvgIcon";
    }
    SvgIcon_default = SvgIcon;
  }
});

// node_modules/@mui/material/SvgIcon/index.js
var init_SvgIcon2 = __esm({
  "node_modules/@mui/material/SvgIcon/index.js"() {
    init_SvgIcon();
    init_svgIconClasses();
    init_svgIconClasses();
  }
});

// node_modules/@mui/material/utils/createSvgIcon.js
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (0, import_jsx_runtime18.jsx)(SvgIcon_default, {
      "data-testid": `${displayName}Icon`,
      ref,
      ...props,
      children: path
    });
  }
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React39.memo(React39.forwardRef(Component));
}
var React39, import_jsx_runtime18;
var init_createSvgIcon = __esm({
  "node_modules/@mui/material/utils/createSvgIcon.js"() {
    "use client";
    React39 = __toESM(require_react());
    init_SvgIcon2();
    import_jsx_runtime18 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/material/utils/debounce.js
var debounce_default;
var init_debounce3 = __esm({
  "node_modules/@mui/material/utils/debounce.js"() {
    init_debounce2();
    debounce_default = debounce;
  }
});

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default;
var init_deprecatedPropType3 = __esm({
  "node_modules/@mui/material/utils/deprecatedPropType.js"() {
    init_deprecatedPropType2();
    deprecatedPropType_default = deprecatedPropType;
  }
});

// node_modules/@mui/material/utils/isMuiElement.js
var isMuiElement_default;
var init_isMuiElement3 = __esm({
  "node_modules/@mui/material/utils/isMuiElement.js"() {
    init_isMuiElement2();
    isMuiElement_default = isMuiElement;
  }
});

// node_modules/@mui/material/utils/ownerDocument.js
var ownerDocument_default;
var init_ownerDocument3 = __esm({
  "node_modules/@mui/material/utils/ownerDocument.js"() {
    init_ownerDocument2();
    ownerDocument_default = ownerDocument;
  }
});

// node_modules/@mui/material/utils/ownerWindow.js
var ownerWindow_default;
var init_ownerWindow3 = __esm({
  "node_modules/@mui/material/utils/ownerWindow.js"() {
    init_ownerWindow2();
    ownerWindow_default = ownerWindow;
  }
});

// node_modules/@mui/material/utils/requirePropFactory.js
var requirePropFactory_default;
var init_requirePropFactory3 = __esm({
  "node_modules/@mui/material/utils/requirePropFactory.js"() {
    init_requirePropFactory2();
    requirePropFactory_default = requirePropFactory;
  }
});

// node_modules/@mui/material/utils/setRef.js
var setRef_default;
var init_setRef3 = __esm({
  "node_modules/@mui/material/utils/setRef.js"() {
    init_setRef2();
    setRef_default = setRef;
  }
});

// node_modules/@mui/material/utils/useEnhancedEffect.js
var useEnhancedEffect_default2;
var init_useEnhancedEffect3 = __esm({
  "node_modules/@mui/material/utils/useEnhancedEffect.js"() {
    "use client";
    init_useEnhancedEffect2();
    useEnhancedEffect_default2 = useEnhancedEffect_default;
  }
});

// node_modules/@mui/material/utils/useId.js
var useId_default;
var init_useId3 = __esm({
  "node_modules/@mui/material/utils/useId.js"() {
    "use client";
    init_useId2();
    useId_default = useId;
  }
});

// node_modules/@mui/material/utils/unsupportedProp.js
var unsupportedProp_default;
var init_unsupportedProp3 = __esm({
  "node_modules/@mui/material/utils/unsupportedProp.js"() {
    init_unsupportedProp2();
    unsupportedProp_default = unsupportedProp;
  }
});

// node_modules/@mui/material/utils/useControlled.js
var useControlled_default;
var init_useControlled3 = __esm({
  "node_modules/@mui/material/utils/useControlled.js"() {
    "use client";
    init_useControlled2();
    useControlled_default = useControlled;
  }
});

// node_modules/@mui/material/utils/useEventCallback.js
var useEventCallback_default2;
var init_useEventCallback3 = __esm({
  "node_modules/@mui/material/utils/useEventCallback.js"() {
    "use client";
    init_useEventCallback2();
    useEventCallback_default2 = useEventCallback_default;
  }
});

// node_modules/@mui/material/utils/useForkRef.js
var useForkRef_default;
var init_useForkRef3 = __esm({
  "node_modules/@mui/material/utils/useForkRef.js"() {
    "use client";
    init_useForkRef2();
    useForkRef_default = useForkRef;
  }
});

// node_modules/@mui/material/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize_default,
  createChainedFunction: () => createChainedFunction_default,
  createSvgIcon: () => createSvgIcon,
  debounce: () => debounce_default,
  deprecatedPropType: () => deprecatedPropType_default,
  isMuiElement: () => isMuiElement_default,
  ownerDocument: () => ownerDocument_default,
  ownerWindow: () => ownerWindow_default,
  requirePropFactory: () => requirePropFactory_default,
  setRef: () => setRef_default,
  unstable_ClassNameGenerator: () => unstable_ClassNameGenerator,
  unstable_memoTheme: () => memoTheme,
  unstable_useEnhancedEffect: () => useEnhancedEffect_default2,
  unstable_useId: () => useId_default,
  unsupportedProp: () => unsupportedProp_default,
  useControlled: () => useControlled_default,
  useEventCallback: () => useEventCallback_default2,
  useForkRef: () => useForkRef_default
});
var unstable_ClassNameGenerator;
var init_utils = __esm({
  "node_modules/@mui/material/utils/index.js"() {
    "use client";
    init_esm();
    init_capitalize3();
    init_createChainedFunction3();
    init_createSvgIcon();
    init_debounce3();
    init_deprecatedPropType3();
    init_isMuiElement3();
    init_memoTheme();
    init_ownerDocument3();
    init_ownerWindow3();
    init_requirePropFactory3();
    init_setRef3();
    init_useEnhancedEffect3();
    init_useId3();
    init_unsupportedProp3();
    init_useControlled3();
    init_useEventCallback3();
    init_useForkRef3();
    unstable_ClassNameGenerator = {
      configure: (generator) => {
        if (true) {
          console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
        }
        ClassNameGenerator_default.configure(generator);
      }
    };
  }
});

export {
  chainPropTypes,
  init_chainPropTypes2 as init_chainPropTypes,
  deepmerge,
  init_deepmerge2 as init_deepmerge,
  elementAcceptingRef_default,
  init_elementAcceptingRef2 as init_elementAcceptingRef,
  elementTypeAcceptingRef_default,
  init_elementTypeAcceptingRef2 as init_elementTypeAcceptingRef,
  exactProp,
  init_exactProp2 as init_exactProp,
  init_formatMuiErrorMessage2 as init_formatMuiErrorMessage,
  getDisplayName,
  init_getDisplayName2 as init_getDisplayName,
  HTMLElementType,
  init_HTMLElementType2 as init_HTMLElementType,
  refType_default,
  init_refType2 as init_refType,
  createChainedFunction,
  debounce,
  ownerDocument,
  ownerWindow,
  setRef,
  useEnhancedEffect_default,
  useId,
  init_useId2 as init_useId,
  useControlled,
  init_useControlled2 as init_useControlled,
  useEventCallback_default,
  useForkRef,
  init_useForkRef2 as init_useForkRef,
  useLazyRef,
  init_useLazyRef2 as init_useLazyRef,
  Timeout,
  useTimeout,
  init_useTimeout2 as init_useTimeout,
  isFocusVisible,
  init_isFocusVisible2 as init_isFocusVisible,
  getScrollbarSize,
  init_getScrollbarSize2 as init_getScrollbarSize,
  usePreviousProps_default,
  init_usePreviousProps2 as init_usePreviousProps,
  getValidReactChildren,
  init_getValidReactChildren2 as init_getValidReactChildren,
  visuallyHidden_default,
  init_visuallyHidden2 as init_visuallyHidden,
  integerPropType_default,
  init_integerPropType2 as init_integerPropType,
  resolveProps,
  init_resolveProps2 as init_resolveProps,
  composeClasses,
  init_composeClasses2 as init_composeClasses,
  ClassNameGenerator_default,
  generateUtilityClass,
  init_generateUtilityClass2 as init_generateUtilityClass,
  generateUtilityClasses,
  init_generateUtilityClasses2 as init_generateUtilityClasses,
  clamp_default,
  init_clamp2 as init_clamp,
  appendOwnerState_default,
  init_appendOwnerState2 as init_appendOwnerState,
  extractEventHandlers_default,
  init_extractEventHandlers2 as init_extractEventHandlers,
  mergeSlotProps_default,
  init_mergeSlotProps2 as init_mergeSlotProps,
  resolveComponentProps_default,
  init_resolveComponentProps2 as init_resolveComponentProps,
  useSlotProps_default,
  init_useSlotProps2 as init_useSlotProps,
  getReactElementRef,
  init_getReactElementRef2 as init_getReactElementRef,
  init_esm,
  capitalize_default,
  init_capitalize3 as init_capitalize,
  createChainedFunction_default,
  init_createChainedFunction3 as init_createChainedFunction,
  handleBreakpoints,
  resolveBreakpointValues,
  getPath,
  init_style2 as init_style,
  styleFunctionSx_default,
  extendSxProp,
  init_styleFunctionSx2 as init_styleFunctionSx,
  css,
  keyframes,
  require_jsx_runtime,
  StyledEngineProvider,
  createBreakpoints,
  init_createBreakpoints,
  createSpacing,
  createBox,
  getThemeProps,
  useThemeProps,
  init_useThemeProps2 as init_useThemeProps,
  useMediaQuery,
  init_useMediaQuery2 as init_useMediaQuery,
  hexToRgb,
  decomposeColor,
  recomposeColor,
  rgbToHex,
  hslToRgb,
  getLuminance,
  getContrastRatio,
  alpha,
  darken,
  lighten,
  emphasize,
  init_colorManipulator2 as init_colorManipulator,
  useRtl,
  init_RtlProvider,
  ThemeProvider_default2 as ThemeProvider_default,
  init_InitColorSchemeScript,
  createCssVarsProvider,
  createContainer,
  createGrid,
  init_Grid2 as init_Grid,
  createStack,
  init_system,
  common_default,
  init_common,
  grey_default,
  init_grey,
  purple_default,
  init_purple,
  red_default,
  init_red,
  orange_default,
  init_orange,
  blue_default,
  init_blue,
  lightBlue_default,
  init_lightBlue,
  green_default,
  init_green,
  createMixins,
  init_createMixins,
  createTypography,
  init_createTypography,
  easing,
  duration,
  createTransitions,
  init_createTransitions,
  createMuiTheme,
  getOverlayAlpha,
  init_getOverlayAlpha,
  createColorScheme,
  init_createColorScheme,
  shouldSkipGeneratingVar,
  init_shouldSkipGeneratingVar,
  excludeVariablesFromRoot_default,
  init_excludeVariablesFromRoot,
  createThemeWithVars,
  init_createThemeWithVars,
  createTheme2 as createTheme,
  init_createTheme3 as init_createTheme,
  defaultTheme_default,
  init_defaultTheme,
  identifier_default,
  init_identifier,
  useTheme5 as useTheme,
  init_useTheme5 as init_useTheme,
  GlobalStyles_default2 as GlobalStyles_default,
  init_GlobalStyles6 as init_GlobalStyles,
  slotShouldForwardProp_default,
  init_slotShouldForwardProp,
  rootShouldForwardProp_default,
  init_rootShouldForwardProp,
  styled_default2 as styled_default,
  init_styled3 as init_styled,
  globalCss,
  internal_createExtendSxProp,
  init_zero_styled,
  memoTheme,
  init_memoTheme,
  useDefaultProps2 as useDefaultProps,
  init_DefaultPropsProvider4 as init_DefaultPropsProvider,
  getSvgIconUtilityClass,
  svgIconClasses_default,
  SvgIcon_default,
  init_SvgIcon2 as init_SvgIcon,
  createSvgIcon,
  init_createSvgIcon,
  debounce_default,
  init_debounce3 as init_debounce,
  deprecatedPropType_default,
  isMuiElement_default,
  init_isMuiElement3 as init_isMuiElement,
  ownerDocument_default,
  init_ownerDocument3 as init_ownerDocument,
  ownerWindow_default,
  init_ownerWindow3 as init_ownerWindow,
  requirePropFactory_default,
  init_requirePropFactory3 as init_requirePropFactory,
  setRef_default,
  useEnhancedEffect_default2,
  init_useEnhancedEffect3 as init_useEnhancedEffect,
  useId_default,
  init_useId3 as init_useId2,
  unsupportedProp_default,
  init_unsupportedProp3 as init_unsupportedProp,
  useControlled_default,
  init_useControlled3 as init_useControlled2,
  useEventCallback_default2,
  init_useEventCallback3 as init_useEventCallback,
  useForkRef_default,
  init_useForkRef3 as init_useForkRef2,
  unstable_ClassNameGenerator,
  utils_exports,
  init_utils
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/styled-engine/index.js:
  (**
   * @mui/styled-engine v6.1.2
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/private-theming/index.js:
  (**
   * @mui/private-theming v6.1.2
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/system/index.js:
  (**
   * @mui/system v6.1.2
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-LR7ZZSBB.js.map
