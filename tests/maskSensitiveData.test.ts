import { describe, expect, it } from "vitest";

import {
  maskEmail,
  maskName,
  maskPhone,
  maskProfileData,
} from "../src/utils/maskSensitiveData";

describe("maskSensitiveData", () => {
  it("masks full names in profile data", () => {
    expect(
      maskProfileData({
        name: "John Alexander Doe",
        email: "john@example.com",
        age: 34,
        phone_number: "5551234567",
        phone_country_code: "+1",
        organisation: "Hushh",
        slug: "john-doe",
      })
    ).toEqual({
      name: "J*** Doe",
      email: "j***n@example.com",
      age: 34,
      phone: "+1-***-4567",
      organisation: "Hushh",
      slug: "john-doe",
    });
  });

  it("masks single-word and short names safely", () => {
    expect(maskName("Prince")).toBe("P***e");
    expect(maskName("Al")).toBe("A***");
    expect(maskName("  ")).toBe("Anonymous");
  });

  it("keeps existing email and phone masking behavior", () => {
    expect(maskEmail("ab@example.com")).toBe("a***@example.com");
    expect(maskPhone("555-1212", "+1")).toBe("+1-***-1212");
  });
});
