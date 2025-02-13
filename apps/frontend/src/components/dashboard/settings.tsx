// src/components/Setting.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import {
  toggleThemeAction,
  toggleMenuAction,
  toggleLayoutAction,
  toggleRTLAction,
  toggleAnimationAction,
  toggleNavbarAction,
  toggleSemidarkAction,
} from "@/redux/dashboard/slicers/toggles-slicers";

import ToggleButton from "@/components/dashboard/toggles-btn";
import LightIcon from "../icons/light-icon";

const Setting: React.FC = () => {
  const themeConfig = useSelector((state: RootState) => state.dashboard.toggles);
  const dispatch = useDispatch();
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <div>
      <div
        className={`${
          showCustomizer ? "!block" : ""
        } fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`}
        onClick={() => setShowCustomizer(false)}
      ></div>

      <nav
        className={`${
          showCustomizer ? "ltr:!right-0 rtl:!left-0" : ""
        } bg-white fixed ltr:-right-[400px] rtl:-left-[400px] top-0 bottom-0 w-full max-w-[400px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
      >
        <button
          type="button"
          className="bg-primary ltr:rounded-tl-full rtl:rounded-tr-full ltr:rounded-bl-full rtl:rounded-br-full absolute ltr:-left-12 rtl:-right-12 top-0 bottom-0 my-auto w-12 h-10 flex justify-center items-center text-white cursor-pointer"
          onClick={() => setShowCustomizer(!showCustomizer)}
        >
          {/* Icon SVG */}
        </button>

        <div className="overflow-y-auto overflow-x-hidden perfect-scrollbar h-full">
          <div className="text-center relative pb-5">
            <button
              type="button"
              className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white"
              onClick={() => setShowCustomizer(false)}
            >
              {/* Close Icon SVG */}
            </button>

            <h4 className="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
            <p className="text-white-dark">
              Set preferences that will be cookied for your live preview
              demonstration.
            </p>
          </div>

          {/* Color Scheme Section */}
          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">
              Color Scheme
            </h5>
            <p className="text-white-dark text-xs">
              Overall light or dark presentation.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <ToggleButton
                label="Light"
                isActive={themeConfig.theme === "light"}
                onClick={() => dispatch(toggleThemeAction("light"))}
                icon={<LightIcon />}
              />
              <ToggleButton
                label="Dark"
                isActive={themeConfig.theme === "dark"}
                onClick={() => dispatch(toggleThemeAction("dark"))}
                icon={<LightIcon />}
              />
              <ToggleButton
                label="System"
                isActive={themeConfig.theme === "system"}
                onClick={() => dispatch(toggleThemeAction("system"))}
                icon={<LightIcon />}
              />
            </div>
          </div>

          {/* Navigation Position Section */}
          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">
              Navigation Position
            </h5>
            <p className="text-white-dark text-xs">
              Select the primary navigation paradigm for your app.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <ToggleButton
                label="Horizontal"
                isActive={themeConfig.menu === "horizontal"}
                onClick={() => dispatch(toggleMenuAction("horizontal"))}
              />
              <ToggleButton
                label="Vertical"
                isActive={themeConfig.menu === "vertical"}
                onClick={() => dispatch(toggleMenuAction("vertical"))}
              />
              <ToggleButton
                label="Collapsible"
                isActive={themeConfig.menu === "collapsible-vertical"}
                onClick={() =>
                  dispatch(toggleMenuAction("collapsible-vertical"))
                }
              />
            </div>
            <div className="mt-5 text-primary">
              <label className="inline-flex mb-0">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={themeConfig.semidark}
                  onChange={(e) =>
                    dispatch(toggleSemidarkAction(e.target.checked))
                  }
                />
                <span>Semi Dark (Sidebar & Header)</span>
              </label>
            </div>
          </div>

          {/* Layout Style Section */}
          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">
              Layout Style
            </h5>
            <p className="text-white-dark text-xs">
              Select the primary layout style for your app.
            </p>
            <div className="flex gap-2 mt-3">
              <ToggleButton
                label="Box"
                isActive={themeConfig.layout === "boxed-layout"}
                onClick={() => dispatch(toggleLayoutAction("boxed-layout"))}
              />
              <ToggleButton
                label="Full"
                isActive={themeConfig.layout === "full"}
                onClick={() => dispatch(toggleLayoutAction("full"))}
              />
            </div>
          </div>

          {/* Direction Section */}
          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">
              Direction
            </h5>
            <p className="text-white-dark text-xs">
              Select the direction for your app.
            </p>
            <div className="flex gap-2 mt-3">
              <ToggleButton
                label="LTR"
                isActive={themeConfig.rtlClass === "ltr"}
                onClick={() => dispatch(toggleRTLAction("ltr"))}
              />
              <ToggleButton
                label="RTL"
                isActive={themeConfig.rtlClass === "rtl"}
                onClick={() => dispatch(toggleRTLAction("rtl"))}
              />
            </div>
          </div>

          {/* Navbar Type Section */}
          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">
              Navbar Type
            </h5>
            <p className="text-white-dark text-xs">Sticky or Floating.</p>
            <div className="mt-3 flex items-center gap-3 text-primary">
              <label className="inline-flex mb-0">
                <input
                  type="radio"
                  checked={themeConfig.navbar === "navbar-sticky"}
                  value="navbar-sticky"
                  className="form-radio"
                  onChange={() => dispatch(toggleNavbarAction("navbar-sticky"))}
                />
                <span>Sticky</span>
              </label>
              <label className="inline-flex mb-0">
                <input
                  type="radio"
                  checked={themeConfig.navbar === "navbar-floating"}
                  value="navbar-floating"
                  className="form-radio"
                  onChange={() =>
                    dispatch(toggleNavbarAction("navbar-floating"))
                  }
                />
                <span>Floating</span>
              </label>
              <label className="inline-flex mb-0">
                <input
                  type="radio"
                  checked={themeConfig.navbar === "navbar-static"}
                  value="navbar-static"
                  className="form-radio"
                  onChange={() => dispatch(toggleNavbarAction("navbar-static"))}
                />
                <span>Static</span>
              </label>
            </div>
          </div>

          {/* Router Transition Section */}
          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">
              Router Transition
            </h5>
            <p className="text-white-dark text-xs">
              Animation of main content.
            </p>
            <div className="mt-3">
              <select
                className="form-select border-primary text-primary"
                value={themeConfig.animation}
                onChange={(e) =>
                  dispatch(toggleAnimationAction(e.target.value))
                }
              >
                <option value=" ">Select Animation</option>
                <option value="animate__fadeIn">Fade</option>
                <option value="animate__fadeInDown">Fade Down</option>
                <option value="animate__fadeInUp">Fade Up</option>
                <option value="animate__fadeInLeft">Fade Left</option>
                <option value="animate__fadeInRight">Fade Right</option>
                <option value="animate__slideInDown">Slide Down</option>
                <option value="animate__slideInLeft">Slide Left</option>
                <option value="animate__slideInRight">Slide Right</option>
                <option value="animate__zoomIn">Zoom In</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Setting;