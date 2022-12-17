import { ZodTypeDef } from "zod";
import { ZodDiscriminatedUnionDefUnversioned } from "./input-mappers/zod/parsers/parseZodDiscriminatedUnionDef";
import { TrpcPanelExtraOptions } from "./parse-router";

export type SharedInputNodeProperties = {
  path: (string | number)[];
  optional?: true;
};

type InputNodeTypes = ZodTypeDef | ZodDiscriminatedUnionDefUnversioned;

export type ArrayNode = {
  type: "array";
  childType: ParsedInputNode;
} & SharedInputNodeProperties;

export type ObjectNode = {
  type: "object";
  children: { [name: string]: ParsedInputNode };
} & SharedInputNodeProperties;

export type EnumNode = {
  type: "enum";
  enumValues: string[];
} & SharedInputNodeProperties;

export type DiscriminatedUnionNode = {
  type: "discriminated-union";
  discriminatedUnionValues: string[];
  discriminatedUnionChildrenMap: {
    [value: string]: ObjectNode;
  };
  discriminatorName: string;
} & SharedInputNodeProperties;

/**
 * Any time you just want the front end to send back a value use this
 */
export type LiteralNode = {
  type: "literal";
  value: string | boolean | number | bigint | null | undefined;
} & SharedInputNodeProperties;

export type StringNode = {
  type: "string";
} & SharedInputNodeProperties;

export type NumberNode = { type: "number" } & SharedInputNodeProperties;

export type BooleanNode = { type: "boolean" } & SharedInputNodeProperties;

export type UnsupportedNode = {
  type: "unsupported";
} & SharedInputNodeProperties;

export type ParsedInputNode =
  | ArrayNode
  | ObjectNode
  | EnumNode
  | DiscriminatedUnionNode
  | LiteralNode
  | StringNode
  | NumberNode
  | BooleanNode
  | UnsupportedNode;

export type ParseReferences = {
  path: string[];
  optional?: true;
  // Doesn't do anything yet but maybe down the road we can extend with this
  options: TrpcPanelExtraOptions;
};

export type ParseFunction<
  InputNodeType extends InputNodeTypes,
  ParsedNodeType extends ParsedInputNode
> = (def: InputNodeType, references: ParseReferences) => ParsedNodeType;

export type ParserSelectorFunction<InputNodeType extends InputNodeTypes> = (
  inputNode: InputNodeType,
  references: ParseReferences
) => ParsedInputNode;
