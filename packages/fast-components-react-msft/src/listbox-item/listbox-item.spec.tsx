import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import { ListboxItemClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import MSFTListboxItem from "./listbox-item";
import {
    ListboxItem,
    ListboxItemHandledProps,
    ListboxItemProps,
    ListboxItemUnhandledProps,
} from "./index";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("context menu item", (): void => {
    const beforeExample: JSX.Element = <div className={"before"}>before</div>;

    test("should have a displayName that matches the component name", () => {
        expect((MSFTListboxItem as any).name).toBe(MSFTListboxItem.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<MSFTListboxItem value="test" id="test" />);
        }).not.toThrow();
    });

    test("should accept unhandledProps", () => {
        const unhandledProps: ListboxItemUnhandledProps = {
            "aria-hidden": true,
        };

        const rendered: any = mount(<ListboxItem {...unhandledProps} />);

        expect(rendered.find("div").prop("aria-hidden")).toEqual(true);
    });
});
