import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import pkg from "../utils/pkg";

interface AuthorOptions {
    name?: string;
    url?: string;
    iconPath?: string;
}

interface CreateEmbedOptions {
    color?: number;
    title?: string;
    author?: AuthorOptions;
    description?: string;
    thumbnailPath?: string;
    imagePath?: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    footer?: { text: string; iconPath?: string };
    timestamp?: boolean | number | Date;
}

const isURL = (str: string) => /^https?:\/\//i.test(str);

function createEmbed(options: CreateEmbedOptions = {}) {
    const files: AttachmentBuilder[] = [];
    const embed = new EmbedBuilder();

    const defaultTitle = pkg.name || "Default Title";
    const defaultDescription = pkg.description || "Default Description";

    if (options.author) {
        const authorName = options.author?.name!;
        const authorUrl = options.author?.url;
        let authorIcon: string | undefined;

        if (options.author?.iconPath) {
            if (isURL(options.author.iconPath)) {
                authorIcon = options.author.iconPath;
            } else {
                const iconName =
                    options.author.iconPath.split("/").pop() || "author.png";
                files.push(
                    new AttachmentBuilder(options.author.iconPath, {
                        name: iconName,
                    }),
                );
                authorIcon = `attachment://${iconName}`;
            }
        }

        embed.setAuthor({
            name: authorName,
            url: authorUrl,
            iconURL: authorIcon,
        });
    }

    if (options.thumbnailPath) {
        if (isURL(options.thumbnailPath)) {
            embed.setThumbnail(options.thumbnailPath);
        } else {
            const thumbName =
                options.thumbnailPath.split("/").pop() || "thumbnail.png";
            files.push(
                new AttachmentBuilder(options.thumbnailPath, {
                    name: thumbName,
                }),
            );
            embed.setThumbnail(`attachment://${thumbName}`);
        }
    }

    if (options.imagePath) {
        if (isURL(options.imagePath)) {
            embed.setImage(options.imagePath);
        } else {
            const imageName = options.imagePath.split("/").pop() || "image.png";
            files.push(
                new AttachmentBuilder(options.imagePath, { name: imageName }),
            );
            embed.setImage(`attachment://${imageName}`);
        }
    }

    if (options.footer) {
        const footer: { text: string; iconURL?: string } = {
            text: options.footer.text,
        };

        if (options.footer.iconPath) {
            if (isURL(options.footer.iconPath)) {
                footer.iconURL = options.footer.iconPath;
            } else {
                const iconName =
                    options.footer.iconPath.split("/").pop() || "footer.png";
                files.push(
                    new AttachmentBuilder(options.footer.iconPath, {
                        name: iconName,
                    }),
                );
                footer.iconURL = `attachment://${iconName}`;
            }
        }

        embed.setFooter(footer);
    }

    embed
        .setColor(options.color || 0xffffff)
        .setTitle(options.title || defaultTitle)
        .setDescription(options.description || defaultDescription);

    if (options.fields) {
        embed.addFields(options.fields);
    }

    if (options.timestamp) {
        embed.setTimestamp(
            typeof options.timestamp === "boolean"
                ? undefined
                : options.timestamp,
        );
    }

    return { embed, files };
}

export default createEmbed;
