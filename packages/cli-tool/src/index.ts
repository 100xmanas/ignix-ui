import { Command } from 'commander';
import { addCommand } from './commands/add';
import { initCommand } from './commands/init';
import { themesCommand } from './commands/theme';
import { wizardCommand } from './commands/wizard';
import { listCommand } from './commands/list';
import prompts from 'prompts';
import chalk from 'chalk';

const program = new Command();

program.version(chalk.red('1.0.0'));

// Register Commands
program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(themesCommand);
program.addCommand(wizardCommand);
// Display welcome message
function showWelcome(): void {
  console.log(`
${chalk.hex('#FF0000').bold('  ██╗ ██████╗ ███╗   ██╗██╗███ ███╗    ██╗   ██╗██╗')}
${chalk.hex('#FF2A2A').bold('  ██║██╔════╝ ████╗  ██║██║╚██ ██╝║    ██║   ██║██║')}
${chalk.hex('#FF5555').bold('  ██║██║  ███╗██╔██╗ ██║██║ ╔███╗ ║    ██║   ██║██║')}
${chalk.hex('#FF8080').bold('  ██║██║   ██║██║╚██╗██║██║╔██ ██╗║    ██║   ██║██║')}
${chalk.hex('#FFAAAA').bold('  ██║╚██████╔╝██║ ╚████║██║███ ███║    ████████║██║')}
${chalk.hex('#FFD5D5').bold('  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝╚══════╝    ╚═══════╝╚═╝')}
  \n${chalk.hex('#FF5555')(
    'A ultimate CLI tool to create modern, production-ready React UI system designed to help you ship beautiful, animated, and accessible interfaces with incredible speed.'
  )} 🔥✨
`);
}

// Interactive CLI Mode
async function startInteractiveCLI(): Promise<void> {
  showWelcome();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response = await prompts({
        type: 'select',
        name: 'action',
        message: chalk.hex('#FF5555')('What would you like to do?'),
        choices: [
          { title: chalk.hex('#FF7A3D')('🚀 Initialize Ignix UI'), value: 'init' },
          { title: chalk.hex('#FF8C00')('➕ Add components'), value: 'add' },
          { title: chalk.hex('#FF6B35')('📋 List components'), value: 'list' },
          { title: chalk.hex('#FF7F50')('🎨 Manage themes'), value: 'themes' },
          { title: chalk.hex('#FFA500')('🧙 Run wizard'), value: 'wizard' },
          { title: chalk.red('❌ Exit'), value: 'exit' },
        ],
        initial: 0,
      });

      if (!response.action || response.action === 'exit') {
        console.log(chalk.yellow('\n👋 Exiting Ignix CLI. Goodbye!\n'));
        process.exit(0);
      }

      // Execute the selected command
      console.log(''); // Add spacing

      switch (response.action) {
        case 'init': {
          await initCommand.parseAsync(['node', 'ignix']);
          break;
        }
        case 'add': {
          const addResponse = await prompts([
            {
              type: 'select',
              name: 'namespace',
              message: 'What do you want to add?',
              choices: [
                { title: 'Component', value: 'component' },
                { title: 'Theme', value: 'theme' },
              ],
            },
            {
              type: 'text',
              name: 'identifiers',
              message: 'Enter component/theme names (space-separated):',
            },
          ]);

          if (addResponse.namespace && addResponse.identifiers) {
            const ids = addResponse.identifiers.split(' ').filter((id: string) => id.trim());
            await addCommand.parseAsync(['node', 'ignix', addResponse.namespace, ...ids]);
          }
          break;
        }
        case 'list': {
          const listResponse = await prompts({
            type: 'select',
            name: 'namespace',
            message: 'What do you want to list?',
            choices: [
              { title: 'Components', value: 'component' },
              { title: 'Themes', value: 'theme' },
            ],
          });

          if (listResponse.namespace) {
            await listCommand.parseAsync(['node', 'ignix', listResponse.namespace]);
          }
          break;
        }
        case 'themes': {
          await themesCommand.parseAsync(['node', 'ignix']);
          break;
        }
        case 'wizard': {
          await wizardCommand.parseAsync(['node', 'ignix']);
          break;
        }
      }

      console.log(''); // Add spacing after command execution
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
      }
      // Continue the loop even if there's an error
    }
  }
}

// Check if running in interactive mode or with arguments
if (process.argv.length <= 2) {
  // No arguments provided - start interactive mode
  startInteractiveCLI().catch((error) => {
    console.error(chalk.red('Fatal error:'), error);
    process.exit(1);
  });
} else {
  // Arguments provided - run as normal CLI
  showWelcome();
  program.parse();
}

// function showWelcome(): void {
//     console.log(`
//   ${chalk.hex('#FF0000').bold('                  ███                                                                     ')}
//   ${chalk.hex('#FF0000').bold('                ████                                                                      ')}
//   ${chalk.hex('#FF0000').bold('               ███                                                                        ')}
//   ${chalk.hex('#FF0000').bold('          █    ████        ██╗ ██████╗ ███╗      ██╗██╗███      ███╗       ██╗      ██╗██╗')}
//   ${chalk.hex('#FF2A2A').bold('           ██  ██████      ██║██╔════╝ ████╗     ██║██║╚██      ██╝║       ██║      ██║██║')}
//   ${chalk.hex('#FF5555').bold('            ███████ █      ██║██║     ╗██╔██╗    ██║██║ ╚██    ██╝ ║       ██║      ██║██║')}
//   ${chalk.hex('#FF8080').bold('             ██ ███ ██     ██║██║  ███║██║╚██╗   ██║██║   ╚██ ██╝  ║       ██║      ██║██║')}
//   ${chalk.hex('#FF8080').bold('           ████ ██ ███     ██║██║   ██║██║ ╚██╗  ██║██║    ╚██╝    ║       ██║      ██║██║')}
//   ${chalk.hex('#FF8080').bold('         █████ ██ ████     ██║██║   ██║██║  ╚██╗ ██║██║   ╔██ ██╗  ║       ██║      ██║██║')}
//   ${chalk.hex('#FF8080').bold('       ██████  ██████      ██║██║   ██║██║   ╚██╗██║██║  ╔██   ██╗ ║       ██║      ██║██║')}
//   ${chalk.hex('#FFAAAA').bold('     ████████ ██████       ██║╚██████╔╝██║    ╚████║██║███║     ███║       ███████████║██║')}
//   ${chalk.hex('#FFD5D5').bold('           ███████████     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝╚══════════════╝       ╚═════════╝╚═╝')}
//     \n${chalk.hex('#FF5555')('A ultimate CLI tool to create modern, production-ready React UI system designed to help you ship beautiful, animated, and accessible interfaces with incredible speed.')} 🔥✨
//   `);
