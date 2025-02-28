function uptime(): string {
    const totalSeconds = Math.floor(process.uptime());

    const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
    let remainingSeconds = totalSeconds % (365 * 24 * 60 * 60);

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    remainingSeconds %= 24 * 60 * 60;

    const hours = Math.floor(remainingSeconds / (60 * 60));
    remainingSeconds %= 60 * 60;

    const minutes = Math.floor(remainingSeconds / 60);

    const units: string[] = [];
    if (years > 0) units.push(`${years}y`);
    if (days > 0) units.push(`${days}d`);
    if (hours > 0) units.push(`${hours}h`);
    if (minutes > 0) units.push(`${minutes}m`);

    return units.slice(0, 2).join(" ") || "0m";
}

export default uptime;
