import { blogEntry, contentEntry, convertDateToString, createEntryFile } from "./util.ts";
import { Command, ValidationError } from "https://deno.land/x/cliffy@v0.25.2/command/mod.ts";

new Command()
  .name("rlog")
  .description("A command to create blog post template.")
  .version("0.1.2")
  .command("create", "Create blog post template.")
  .option("-t, --type <post-type>", "The post type(blog or contents).", {
    value: (value: string): string => {
      if (["blog", "contents"].indexOf(value) === -1) {
        throw new ValidationError(
          `Type must be one of "blog or contents", but got "${value}".`
        );
      }
      return value;
    }
  })
  .action((options) => create(options))
  .parse(Deno.args);

const create = (options) => {
  try {
    const today = new Date()
    switch (options.type) {
      case "blog": {
        const todayString = convertDateToString(today);
        createEntryFile(blogEntry.replace('_PUBLISH_DATE', todayString), todayString);
        console.log(`Success to create blog post ${todayString}.md.`);
        break;
      }
      case "contents": {
        const dateLastDayOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const stringLastDayOfTheMonth = convertDateToString(dateLastDayOfTheMonth);
        createEntryFile(contentEntry.replace('_PUBLISH_DATE', stringLastDayOfTheMonth), stringLastDayOfTheMonth + '_monthly-contents');
        console.log(`Success to create blog post ${stringLastDayOfTheMonth}_monthly-contents.md.`);
        break;
      }
    }
  } catch (err) {
    console.error(`Failed to create blog post. ${err.message}`);
  }
}
