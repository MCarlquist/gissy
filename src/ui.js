import figlet from "figlet";
import chalk from "chalk";

// Compact logo (minimal mode)
const compactLogo = chalk.magentaBright("🚀 gissy — automate your GitHub workflows");

// Banner logo (full mode)
function bannerLogo() {
  return chalk.cyan(
    figlet.textSync("gissy", {
      font: "Slant", // You can change font: 'Big', 'Standard', '3D-ASCII', etc.
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  );
}

export function printHeader(mode = "banner", commandTitle) {
  if (mode === "compact") {
    console.log(compactLogo);
  } else {
    console.log(bannerLogo());
  }

  if (commandTitle) {
    console.log(chalk.blue.bold(`\n${commandTitle}\n`));
  }
}
