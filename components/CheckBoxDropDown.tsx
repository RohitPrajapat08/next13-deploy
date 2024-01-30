import { useState } from "react";
import Select, {
  components as Components,
  OptionProps,
  GroupBase,
} from "react-select";
import { searchOptions } from "../constant/constants";

const InputOption: any = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  innerRef, // Include innerRef
  label, // Include label
  type, // Include type
  data, // Include data
  clearValue, // Include clearValue
  cx, // Include cx
  getClassNames, // Include getClassNames
  getValue, // Include getValue
  hasValue, // Include hasValue
  isMulti, // Include isMulti
  isRtl, // Include isRtl
  options, // Include options
  selectOption, // Include selectOption
  selectProps, // Include selectProps
  setValue, // Include setValue
  theme, // Include theme
  ...rest
}: {
  [x: string]: any;
  getStyles: any;
  Icon: any;
  isDisabled: any;
  isFocused: any;
  isSelected: any;
  children: any;
  innerProps: any;
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <Components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
      innerRef={innerRef} // Pass innerRef
      label={label} // Pass label
      type={type} // Pass type
      data={data} // Pass data
      clearValue={clearValue} // Pass clearValue
      cx={cx} // Pass cx
      getClassNames={getClassNames} // Pass getClassNames
      getValue={getValue} // Pass getValue
      hasValue={hasValue} // Pass hasValue
      isMulti={isMulti} // Pass isMulti
      isRtl={isRtl} // Pass isRtl
      options={options} // Pass options
      selectOption={selectOption} // Pass selectOption
      selectProps={selectProps} // Pass selectProps
      setValue={setValue} // Pass setValue
      theme={theme} // Pass theme
    >
      <input type="checkbox" checked={isSelected} />
      {children}
    </Components.Option>
  );
};

export default function Example(props: any) {
  //   const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Select
      defaultValue={[]}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      onChange={(options) => {
        if (Array.isArray(options)) {
          //   setSelectedOptions(options.map((opt) => opt.value));
          props.searchCategory(options.map((opt) => opt.value));
        }
      }}
      options={searchOptions}
      components={{
        Option: InputOption,
      }}
    />
  );
}
