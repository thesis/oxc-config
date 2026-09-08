const greeting = "hello";

export function greet(firstName: string, lastName: string, punctuation: string, emphasis: boolean) {
  return greeting + " " + firstName + " " + lastName + punctuation + (emphasis ? "!" : "");
}
