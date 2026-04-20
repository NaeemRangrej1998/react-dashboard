import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const Select = ({
  options = [],
  isMulti = false,
  width = "",
  placeholder = "Select...",
  value: externalValue,
  defaultValue = null,
  onChange: externalOnChange,
  useFieldAs = { label: "label", value: "value" },
  onScroll = () => {},
  onSearch,
  disabled,
  isClearable = false,
  isShowAllSelect = true,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionsRefs = useRef([]);
  const inputRef = useRef(null);

  const value = externalValue !== undefined ? externalValue : internalValue;

  const onChange = (newValue) => {
    if (externalOnChange) externalOnChange(newValue);
    setInternalValue(newValue);
  };

  useEffect(() => {
    if (externalValue === undefined) setInternalValue(defaultValue);
  }, [defaultValue, externalValue]);

  useEffect(() => setMounted(true), []);

  const getLabel = (option) => option?.[useFieldAs.label];
  const getValue = (option) => option?.[useFieldAs.value];

  const isSelected = (option) => {
    if (!value) return false;

    if (isMulti && Array.isArray(value)) {
      return value.some(
        (v) =>
          String(getValue(v)).toLowerCase() ===
          String(getValue(option)).toLowerCase()
      );
    }

    return (
      String(getValue(value)).toLowerCase() ===
      String(getValue(option)).toLowerCase()
    );
  };

  const toggleOption = (option) => {
    if (!option) return onChange(null);

    if (!isMulti) {
      onChange(option);
      setOpen(false);
    } else {
      const current = Array.isArray(value) ? value : [];

      if (isSelected(option)) {
        onChange(
          current.filter(
            (v) =>
              String(getValue(v)).toLowerCase() !==
              String(getValue(option)).toLowerCase()
          )
        );
      } else {
        onChange([...current, option]);
      }
    }
  };

  const handleSelectAll = () => onChange([...options]);
  const handleUnselectAll = () => onChange([]);

  const filteredOptions = useMemo(() => {
    return options.filter((o) =>
      String(getLabel(o)).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  const updateDropdownPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleClickOutside = (e) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setOpen(false);
      setSearch("");
    }
  };

  useEffect(() => {
    if (open) {
      updateDropdownPosition();
      window.addEventListener("resize", updateDropdownPosition);
    }
    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [open]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyNavigation = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        toggleOption(filteredOptions[activeIndex]);
      }
    }
  };

  const renderValue = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    if (Array.isArray(value)) {
      return `${getLabel(value[0])}${
        value.length > 1 ? ` + ${value.length - 1} more` : ""
      }`;
    }

    return getLabel(value);
  };

  const renderDropdown = () => {
    if (!open) return null;

  return createPortal(
      <div
        ref={dropdownRef}
        className="fixed border border-slate-200 bg-white rounded-lg shadow-lg z-[9999]"
        style={{
          top: dropdownPosition.top + 8,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
        }}
      >
        {isMulti && isShowAllSelect && (
          <div
            className="flex justify-between items-center px-3 py-2 text-sm border-b border-slate-200 cursor-pointer"
            onClick={
              options.length !== (value || []).length
                ? handleSelectAll
                : handleUnselectAll
            }
          >
            <input
              type="checkbox"
              readOnly
              checked={options.length === (value || []).length}
            />
            <span className="ml-2">
              {options.length === (value || []).length
                ? "Unselect All"
                : "Select All"}
            </span>
          </div>
        )}

        <ul
          onScroll={onScroll}
          className="max-h-48 overflow-y-auto text-sm"
        >
          {filteredOptions.length === 0 ? (
            <li className="p-3 text-gray-500">No options</li>
          ) : (
            filteredOptions.map((option, index) => {
              const checked = isSelected(option);

              return (
                <li
                  key={getValue(option)}
                  ref={(el) => (optionsRefs.current[index] = el)}
                  className={`px-3 py-2 cursor-pointer flex items-center gap-2
                    ${checked ? "bg-blue-50 text-blue-700" : ""}
                    ${index === activeIndex ? "bg-blue-100" : ""}
                  `}
                  onClick={() => {
                    toggleOption(option);
                    inputRef.current?.focus();
                  }}
                >
                  {isMulti && (
                    <input type="checkbox" checked={checked} readOnly />
                  )}
                  <span className="truncate">{getLabel(option)}</span>
                </li>
              );
            })
          )}
        </ul>
      </div>,
      document.body
    );
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`relative ${width} ${
        disabled ? "bg-gray-100" : "cursor-pointer"
      }`}
    >
      <div
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`flex items-center h-10 border rounded-lg px-3 bg-white ${
          open ? "border-blue-600" : "border-slate-300"
        }`}
      >
        {open ? (
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch?.(e);
            }}
            onKeyDown={handleKeyNavigation}
            className="w-full outline-none"
            autoFocus
            placeholder={renderValue() || placeholder}
          />
        ) : (
          <div className="w-full truncate">
            {renderValue() || (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
        )}

        {isClearable && value && (
          <MdClose
            className="mr-2"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
          />
        )}

        <FaChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {renderDropdown()}
    </div>
  );
};

export default Select;
