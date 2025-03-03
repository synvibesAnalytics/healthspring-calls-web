module.exports = {
    apps: [
      {
        name: "calls-dashboard",
        script: "npm",
        args: "start",
        env: {
          NODE_ENV: "production",
          PORT: 4002
        }
      }
    ]
  };
  
