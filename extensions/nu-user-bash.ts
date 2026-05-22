import * as fs from "node:fs";
import { basename } from "node:path";
import {
	createLocalBashOperations,
	type ExtensionAPI,
} from "@earendil-works/pi-coding-agent";

// shellQuote escapes for the outer shell (bash), which receives the quoted
// string, strips the outer single quotes, and passes the literal command to
// `nu -c`. Nushell then parses the command using its own syntax rules.
function shellQuote(value: string) {
	return `'${value.replaceAll("'", `'\\''`)}'`;
}

function getNuPath() {
	if (process.env.PI_USER_NU_SHELL) return process.env.PI_USER_NU_SHELL;
	if (process.env.SHELL && basename(process.env.SHELL) === "nu") {
		return process.env.SHELL;
	}
	return "nu";
}

function isExecutableAvailable(path: string): boolean {
	if (path.includes("/")) {
		return fs.existsSync(path);
	}
	// Bare command name — let the shell resolve it via PATH at exec time
	return true;
}

export default function (pi: ExtensionAPI) {
	const nuPath = getNuPath();
	if (!isExecutableAvailable(nuPath)) {
		console.warn(`[nu-user-bash] Nushell not found at "${nuPath}". Integration disabled.`);
		return;
	}

	const local = createLocalBashOperations();

	pi.on("user_bash", () => {
		return {
			operations: {
				exec(command, cwd, options) {
					const nuCommand = `exec ${shellQuote(nuPath)} -c ${shellQuote(command)}`;
					return local.exec(nuCommand, cwd, options);
				},
			},
		};
	});
}
