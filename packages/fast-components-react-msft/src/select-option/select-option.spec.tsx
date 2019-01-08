import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import SelectOption, { SelectOptionUnhandledProps } from "./select-option";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("select option", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((SelectOption as any).name).toBe(SelectOption.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<SelectOption />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: SelectOptionUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<SelectOption {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });
});
