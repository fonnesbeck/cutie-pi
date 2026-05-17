import { basename } from "node:path";
import {
	createLocalBashOperations,
	type ExtensionAPI,
} from "@earendil-works/pi-coding-agent";

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

export default function (pi: ExtensionAPI) {
	const local = createLocalBashOperations();

	pi.on("user_bash", () => {
		return {
			operations: {
				exec(command, cwd, options) {
					const nuCommand = `exec ${shellQuote(getNuPath())} -c ${shellQuote(command)}`;
					return local.exec(nuCommand, cwd, options);
				},
			},
		};
	});
}
