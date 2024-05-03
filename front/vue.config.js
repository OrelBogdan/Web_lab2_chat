const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true, // Compile at run time
	configureWebpack: {
		resolve: {
			alias: {
				vue: 'vue/dist/vue.esm-bundler.js',
			},
		},
	},
  pages: {
	  index: {
			entry: "./src/pages/index/index.js",
			// template: "public/index.html",
			template: "./src/pages/index/index.html",
			title: "Home",
			chunks: ["chunk-vendors", "chunk-common", "index"],
		},
		about: {
			entry: "./src/pages/about/about.js",
			// template: "public/index.html",
			filename: "about.html",
			template: "./src/pages/about/about.html",
			title: "Home",
			chunks: ["chunk-vendors", "chunk-common", "about"],
		},
		myaccount: {
			entry: "./src/pages/myaccount/myaccount.js",
		// template: "public/index.html",
			filename: "myaccount.html",
			template: "./src/pages/myaccount/myaccount.html",
			title: "Home",
			chunks: ["chunk-vendors", "chunk-common", "myaccount"],
		},
		calculator: {
			entry: "./src/pages/calculator/calculator.js",
			// template: "public/index.html",
			filename: "calculator.html",
			template: "./src/pages/calculator/calculator.html",
			title: "Home",
			chunks: ["chunk-vendors", "chunk-common", "calculator"],
		},
		registration: {
			entry: "./src/pages/registration/registration.js",
			// template: "public/index.html",
			filename: "registration.html",
			template: "./src/pages/registration/registration.html",
			title: "Home",
			chunks: ["chunk-vendors", "chunk-common", "registration"],
		},
		signin: {
			entry: "./src/pages/signin/signin.js",
			// template: "public/index.html",
			filename: "signin.html",
			template: "./src/pages/signin/signin.html",
			title: "Home",
			chunks: ["chunk-vendors", "chunk-common", "signin"],
		},
  },
})
