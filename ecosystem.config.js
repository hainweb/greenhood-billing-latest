module.exports = {
    apps: [
        {
            name: "greenhood-billing-app",
            script: "cmd.exe",
            args: '/c "node node_modules/next/dist/bin/next start -p 4444"',
            instances: 1,
            exec_mode: "fork",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};