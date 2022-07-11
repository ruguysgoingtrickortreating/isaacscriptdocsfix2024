import chalk from "chalk";
import { PROJECT_NAME, TSCONFIG_JSON, TSCONFIG_JSON_PATH } from "./constants";
import { CustomStage } from "./interfaces/CustomStage";
import { getJSONC } from "./json";
import { error, isRecord } from "./utils";

const ADVICE = `Try copying the "${TSCONFIG_JSON}" from a brand new ${PROJECT_NAME} project.`;

function getTSConfigJSON(verbose: boolean): Record<string, unknown> {
  return getJSONC(TSCONFIG_JSON_PATH, verbose);
}

function getIsaacScriptSection(
  verbose: boolean,
): Record<string, unknown> | undefined {
  const tsConfig = getTSConfigJSON(verbose);

  // We allow different kinds of casing for the property name.
  for (const propertyName of ["isaacscript", "isaacScript", "IsaacScript"]) {
    const property = tsConfig[propertyName];
    if (property !== undefined) {
      if (!isRecord(property)) {
        error(
          `Your "${chalk.green(
            TSCONFIG_JSON_PATH,
          )}" file has a non-object value for the "${propertyName}" property, which is surely a mistake. ${ADVICE}`,
        );
      }

      return property;
    }
  }

  return undefined;
}

export function getFirstTSConfigIncludePath(verbose: boolean): string {
  const tsConfig = getTSConfigJSON(verbose);

  const { include } = tsConfig;
  if (include === undefined) {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file does not have an "include" property, which is surely a mistake. ${ADVICE}`,
    );
  }

  if (!Array.isArray(include)) {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file has an "include" property that is not an array, which is surely a mistake. ${ADVICE}`,
    );
  }

  const firstInclude = include[0] as unknown | undefined;
  if (firstInclude === undefined) {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file has an empty "include" property, which is surely a mistake. ${ADVICE}`,
    );
  }

  if (typeof firstInclude !== "string") {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file has a non-string "include" value, which is surely a mistake. ${ADVICE}`,
    );
  }

  return firstInclude;
}

export function getCustomStages(verbose: boolean): CustomStage[] {
  const isaacScriptSection = getIsaacScriptSection(verbose);
  if (isaacScriptSection === undefined) {
    return [];
  }

  const { customStage } = isaacScriptSection;
  if (typeof customStage !== "boolean") {
    error(
      `The "customStage" property in the "${TSCONFIG_JSON}" file is not a boolean.`,
    );
  }

  return [];
}
