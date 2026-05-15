import fs from 'fs';

const inputData = {
    'Languages': [
        'Apache Groovy', 'Assembly Script', 'Bash Script', 'C', 'C#', 'C++', 'Clojure', 'Crystal', 'CSS3', 'Dart', 'DGraph', 'Elixir', 'Elm', 'Erlang', 'Fortran', 'Go/Golang', 'GraphQL', 'Haskell', 'HTML5', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'LaTeX', 'Lua', 'Markdown', 'Nim', 'Nix', 'Objective-C', 'OCaml', 'Octave', 'Org Mode', 'Perl', 'PHP', 'PowerShell', 'Python', 'R', 'ReScript', 'Ruby', 'Rust', 'Scala', 'Solidity', 'Swift', 'TypeScript', 'Windows Terminal', 'Zig'
    ],
    'Hosting/SaaS': [
        'Alibaba Cloud', 'AWS', 'Azure', 'Cloudflare', 'Codeberg', 'Datadog', 'DigitalOcean', 'Firebase', 'Glitch', 'Google Cloud', 'Heroku', 'Linode', 'Netlify', 'OpenStack', 'Oracle', 'OVH', 'Render', 'Scaleway', 'Vercel', 'Vultr'
    ],
    'Frameworks/Libraries': [
        '.NET', 'AdonisJS', 'Alpine.js', 'Anaconda', 'Angular', 'Angular.js', 'Ant Design', 'Apache Hadoop', 'Apache Hive', 'Apache Kafka', 'Apache Spark', 'Apollo GraphQL', 'Astro', 'Aurelia', 'Blazor', 'Bootstrap', 'Buefy', 'Bulma', 'Bun', 'Chakra UI', 'Chart.js', 'Code Igniter', 'Context API', 'CUDA', 'DaisyUI', 'Deno JS', 'Directus', 'Django', 'DjangoRest', 'Drupal', 'EJS', 'Elasticsearch', 'Electron.js', 'Ember', 'Esbuild', 'Expo', 'Express.js', 'FastAPI', 'Fastify', 'Filament', 'Flask', 'Flutter', 'Framework7', 'Gatsby.js', 'Grav', 'Green Sock', 'Gulp', 'Gutenberg', 'Handlebars', 'Insomnia', 'Ionic', 'Jasmine', 'JavaFX', 'Jinja', 'Joomla', 'JQuery', 'JWT/JSON Web Token', 'Laravel', 'Less', 'Livewire', 'Mantine', 'MaxCompute', 'Meteor JS', 'MUI', 'NestJS', 'Next JS', 'Node-RED', 'Node.js', 'Nodemon', 'NPM', 'Nuxt JS', 'NX', 'OpenCV', 'OpenGL', 'p5js', 'Phoenix Framework', 'PNPM', 'Pug', 'Qt', 'Quarkus', 'Quasar', 'RabbitMQ', 'Radix UI', 'Rails', 'Raylib', 'React', 'React Hook Form', 'React Native', 'React Query', 'React Router', 'Redux', 'Remix', 'RollupJS', 'ROS', 'RXDB', 'RXJS', 'Sass', 'Semantic UI React', 'Snowflake', 'Socket.io', 'SolidJS', 'Spring', 'Strapi', 'Streamlit', 'Styled Components', 'Stylus', 'Svelte', 'SvelteKit', 'Symfony', 'TailwindCSS', 'Tauri', 'Three.js', 'Thymeleaf', 'TRPC', 'TypeGraphQL', 'UnoCSS', 'Vite', 'Vue.js', 'Vuetify', 'Web3.js', 'WebGL', 'Webpack', 'WindiCSS', 'Wordpress', 'Xamarin', 'Yarn'
    ],
    'Servers': [
        'Apache', 'Apache Airflow', 'Apache Ant', 'Apache Flink', 'Apache Maven', 'Apache Tomcat', 'Gunicorn', 'Jenkins', 'Nginx'
    ],
    'Databases': [
        'Amazon DynamoDB', 'Appwrite', 'ArangoDB', 'Cassandra', 'Cockroach Labs', 'Couchbase', 'CrateDB', 'Hibernate', 'InfluxDB', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'MusicBrainz', 'MySQL', 'Neo4j', 'PlanetScale', 'PocketBase', 'Postgres', 'Prisma', 'Quill', 'Realm', 'Redis', 'Sequelize', 'Single Store', 'SQLite', 'Supabase', 'SurrealDB', 'Teradata'
    ],
    'Design': [
        'Adobe', 'Adobe Acrobat Reader', 'Adobe After Effects', 'Adobe Audition', 'Adobe Creative Cloud', 'Adobe Dreamweaver', 'Adobe Fonts', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe Lightroom', 'Adobe Lightroom Classic', 'Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe XD', 'Affinity Designer', 'Affinity Photo', 'Aseprite', 'Blender', 'Canva', 'Clip Studio Paint', 'Dribbble', 'Figma', 'Framer', 'GIMP', 'Inkscape', 'InVision', 'Krita', 'Proto.io', 'Rhinoceros', 'Sketch', 'Sketch Up', 'Storybook'
    ],
    'ML/DL': [
        'Keras', 'Matplotlib', 'MLFlow', 'Numpy', 'Pandas', 'Plotly', 'PyTorch', 'Scikit-Learn', 'Scipy', 'Tensorflow'
    ],
    'CI/CD': [
        'Apache Subversion', 'Bitbucket', 'ChipperCI', 'CircleCI', 'CloudBees', 'Fastlane', 'Forgejo', 'Git', 'Gitee', 'Github', 'Github Actions', 'Gitlab', 'Gitlab CI', 'Gitpod', 'Mercurial', 'Octopus Deploy', 'Perforce Helix', 'TeamCity', 'Travis CI'
    ],
    'Testing': [
        'Cypress', 'Jest', 'Mocha', 'Playwright', 'Puppeteer', 'Selenium', 'Sentry', 'Testing Library', 'Vitest'
    ],
    'Tools': [
        'Airbnb', 'Alfred', 'AMD', 'Analogue', 'Ansible', 'Aqua Sec', 'Arduino', 'Babel', 'Bitwarden', 'Cisco', 'CMake', 'Codecov', 'Confluence', 'Crowdin', 'Docker', 'ESLint', 'FFmpeg', 'Gradle', 'Grafana', 'Home Assistant', 'Homebridge', 'Jellyfin', 'Jira', 'Kubernetes', 'Meta', 'Mosquitto', 'Notion', 'Nvidia', 'OpenAPI Specification', 'OpenSea', 'OpenTelemetry', 'Packer', 'Pi-hole', 'PlatformIO', 'Plex', 'Portfolio', 'Postman', 'Power BI', 'Prettier', 'Prezi', 'Prometheus', 'Rancher', 'Raspberry Pi', 'SonarLint', 'SonarQube', 'Splunk', 'Swagger', 'Tampermonkey', 'Terraform', 'Tor', 'Trello', 'Twilio', 'Uber', 'Ubiquiti', 'Vagrant', 'Wireguard', 'XFCE', 'Zigbee'
    ],
    'Gaming': [
        'Battle.net', 'Bevy', 'EA', 'Epic Games', 'Godot Engine', 'Humble Bundle', 'Itch.io', 'Playstation Network', 'Riot Games', 'SideQuest', 'Square Enix', 'Steam', 'Ubisoft', 'Unity', 'Unreal Engine', 'Xbox'
    ]
};

const manualOverrides = {
    'Go/Golang': 'go',
    'Angular.js': 'angularjs',
    'Next JS': 'nextdotjs',
    'Next.js': 'nextdotjs',
    'Node.js': 'nodedotjs',
    'Nuxt JS': 'nuxtdotjs',
    'Vue.js': 'vuedotjs',
    'React Native': 'react',
    'React Router': 'reactrouter',
    'React Hook Form': 'reacthookform',
    'React Query': 'reactquery',
    'Three.js': 'threedotjs',
    'Web3.js': 'web3dotjs',
    'Express.js': 'express',
    'C#': 'csharp',
    'C++': 'cplusplus',
    'F#': 'fsharp',
    'P5js': 'p5dotjs',
    'Socket.io': 'socketdotio',
    'Deno JS': 'deno',
    'Gatsby.js': 'gatsby',
    'Chart.js': 'chartdotjs',
    'Alpine.js': 'alpinedotjs',
    'Electron.js': 'electron',
    'Green Sock': 'greensock',
    'Meteor JS': 'meteor',
    'RXJS': 'rxjs',
    'Microsoft SQL Server': 'microsoftsqlserver',
    'Postgres': 'postgresql',
    'Single Store': 'singlestore',
    'Adobe Acrobat Reader': 'adobeacrobatreader',
    'Adobe Lightroom': 'adobelightroom',
    'Adobe Lightroom Classic': 'adobelightroomclassic',
    'Github Actions': 'githubactions',
    'Gitlab CI': 'gitlab',
    'Testing Library': 'testinglibrary',
    'OpenAPI Specification': 'openapiinitiative',
    'Home Assistant': 'homeassistant',
    'Raspberry Pi': 'raspberrypi',
    'Godot Engine': 'godotengine',
    'Unreal Engine': 'unrealengine',
    'Windows Terminal': 'windows',
    'Bash Script': 'gnu-bash',
    'JWT/JSON Web Token': 'jsonwebtokens',
    'Expo': 'expo',
    'AWS': 'amazonaws',
    'Google Cloud': 'googlecloud',
    'GCP': 'googlecloud',
    'Nvidia': 'nvidia',
    'JQuery': 'jquery',
    'MUI': 'mui',
    'Less': 'less',
    'Sass': 'sass',
    'Ant Design': 'antdesign',
    'DigitalOcean': 'digitalocean',
    'Heroku': 'heroku',
    '.NET': 'dotnet',
    'Stylus': 'stylus',
    'OpenGL': 'opengl',
};

async function run() {
    process.stderr.write('Fetching simple-icons data...\n');
    let icons;
    try {
        const resp = await fetch('https://unpkg.com/simple-icons/icons.json');
        if (!resp.ok) throw new Error(\`Status \${resp.status}\`);
        icons = await resp.json();
    } catch (err) {
        console.error('Failed to fetch icons:', err);
        process.exit(1);
    }
    process.stderr.write(\`Fetched \${icons.length} icons.\n\`);

    const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const iconMap = new Map();
    
    icons.forEach(icon => {
        iconMap.set(normalize(icon.title), icon);
        iconMap.set(normalize(icon.slug), icon);
        if (icon.aliases) {
            if (icon.aliases.aka) icon.aliases.aka.forEach(a => iconMap.set(normalize(a), icon));
            if (icon.aliases.dup) icon.aliases.dup.forEach(d => iconMap.set(normalize(d.title), icon));
        }
    });

    const output = [];
    const missing = [];

    for (const [category, items] of Object.entries(inputData)) {
        for (const item of items) {
            let query = item;
            if (manualOverrides[item]) query = manualOverrides[item];
            
            let normalizedQuery = normalize(query);
            let match = iconMap.get(normalizedQuery);
            
            if (!match) {
               if (normalizedQuery.endsWith('js')) match = iconMap.get(normalizedQuery.slice(0, -2) + 'dotjs');
               if (!match && normalizedQuery.endsWith('js')) match = iconMap.get(normalizedQuery.slice(0, -2));
               if (!match && normalizedQuery.startsWith('apache')) match = iconMap.get(normalizedQuery.replace('apache', ''));
            }

            if (match) {
                output.push({
                    name: item,
                    slug: match.slug,
                    color: match.hex,
                    category: category
                });
            } else {
                // Approximate known missing ones or keep them with default color
                missing.push(item);
                output.push({
                    name: item,
                    slug: normalizedQuery,
                    color: '6e6e6e',
                    category: category
                });
            }
        }
    }
    
    if (missing.length > 0) {
        process.stderr.write(\`\nMissing icons for \${missing.length} items: \${missing.slice(0, 5).join(', ')}...\n\`);
    }

    const fileContent = \`export const techStack = \${JSON.stringify(output, null, 4)};\n\`;
    // Ensure we are not deleting any existing keys? 
    // The user wants to replace/update. I'm overwriting entirely based on his list.
    fs.writeFileSync('src/data/techStack.js', fileContent);
    console.log('Successfully updated src/data/techStack.js');
}

run();
