import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import Listbox, { ListboxUnhandledProps } from "./listbox";
import { KeyCodes } from "@microsoft/fast-web-utilities";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("context menu", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((Listbox as any).name).toBe(Listbox.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Listbox />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: ListboxUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<Listbox {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });
});
