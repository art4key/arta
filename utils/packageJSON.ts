interface PackageManifest {
    name: string;
    description?: string;
    version: string;
    author?: Author;
    repository?: Repository;
    bugs?: Bugs;
    homepage?: string;
    keywords?: string[];
    license?: string;
    private?: boolean;
    scripts?: Scripts;
    devDependencies?: DependenciesMap;
    peerDependencies?: DependenciesMap;
    dependencies?: DependenciesMap;
    optionalDependencies?: DependenciesMap;
}

interface Author {
    name: string;
    url?: string;
    email?: string;
}

interface Repository {
    type: string;
    url: string;
}

interface Bugs {
    url?: string;
    email?: string;
}

interface Scripts {
    [key: string]: string;
}

interface DependenciesMap {
    [packageName: string]: string;
}

const packageJSON: PackageManifest = await Bun.file("./package.json").json();

export default packageJSON;
