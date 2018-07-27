import * as ts from "typescript";
import * as Lint from "tslint";

export class Formatter extends Lint.Formatters.AbstractFormatter {
    public format(failures: Lint.RuleFailure[]): string {
      console.log('00000000')
      var failuresJSON = failures.map((failure: Lint.RuleFailure) => failure.toJson());
      return JSON.stringify(failuresJSON);
    }
}
