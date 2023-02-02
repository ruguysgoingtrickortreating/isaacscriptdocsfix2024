import { TSESLint } from "@typescript-eslint/utils";
import * as prettier from "prettier";
import { rules } from "../src/rules";
import { PLUGIN_NAME } from "./constants";

export type RuleDefinition = TSESLint.RuleModule<string, unknown[]>;

const RULE_NAME_PREFIX = `${PLUGIN_NAME}/`;
const PRETTIER_CONFIG = prettier.resolveConfig.sync(__dirname);

/** From: https://github.com/expandjs/expandjs/blob/master/lib/kebabCaseRegex.js */
const KEBAB_CASE_REGEX =
  /^([a-z](?![\d])|[\d](?![a-z]))+(-?([a-z](?![\d])|[\d](?![a-z])))*$|^$/;

export function formatWithPrettier(
  text: string,
  language: "typescript" | "markdown",
): string {
  return prettier.format(text, {
    parser: language,
    ...PRETTIER_CONFIG,
  });
}

export function getAlphabeticalRuleEntries(): Array<[string, RuleDefinition]> {
  return Object.entries(rules).sort((a, b) => a[0].localeCompare(b[0]));
}

export function getAutoGeneratedComment(scriptName: string): string {
  return `/* eslint-disable isaacscript/format-line-comments */

// THIS CODE WAS AUTOMATICALLY GENERATED.
// DO NOT EDIT THIS FILE BY HAND.
// YOU CAN REGENERATE IT USING:
// yarn run generate:${scriptName}

`;
}

export function getCamelCaseRuleName(kebabCaseName: string): string {
  const ruleNameCamelCase = kebabCaseToCamelCase(kebabCaseName);
  return ruleNameCamelCase.replace("Jsdoc", "JSDoc");
}

export function getFullRuleName(ruleName: string): string {
  return `${RULE_NAME_PREFIX}${ruleName}`;
}

/** Kebab case is the naming style of using all lowercase and hyphens, like "foo-bar". */
export function isKebabCase(string: string): boolean {
  return KEBAB_CASE_REGEX.test(string);
}

export function isRecommendedRule(rule: RuleDefinition): boolean {
  if (rule.meta.docs === undefined) {
    return false;
  }

  return rule.meta.docs.recommended !== false;
}

function kebabCaseToCamelCase(text: string): string {
  return text.replace(/-./g, (match) => {
    const firstLetterOfWord = match[1];
    return firstLetterOfWord === undefined
      ? ""
      : firstLetterOfWord.toUpperCase();
  });
}

/** Intended to be used on file content that needs to have a trailing newline. */
export function removeFirstAndLastLine(text: string): string {
  const lines = text.trim().split("\n");
  lines.shift(); // Remove first line
  lines.pop(); // Remove last line
  lines.push(""); // Add a trailing newline
  return lines.join("\n");
}
