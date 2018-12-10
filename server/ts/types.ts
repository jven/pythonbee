export interface TypedValue {
  type: string,
  value: string
}

export interface TestCase {
  params: TypedValue[],
  expected: TypedValue
}