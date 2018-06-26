<?php
declare(strict_types = 1);
namespace TYPO3\CMS\Core\Core;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

/**
 * This class is initialized once in the SystemEnvironmentBuilder, and can then
 * be used throughout the application to access common variables
 * related to path-resolving and OS-/PHP-application specific information.
 *
 * It's main design goal is to remove any access to constants within TYPO3 code and to provide a static,
 * for TYPO3 core and extensions non-changeable information.
 *
 * This class does not contain any HTTP related information, as this is handled in NormalizedParams functionality.
 *
 * All path-related methods do return the realpath to the paths without (!) the trailing slash.
 *
 * This class only defines what is configured through the environment, does not do any checks if paths exist
 * etc. This should be part of the application or the SystemEnvironmentBuilder.
 *
 * In your application, use it like this:
 *
 * Instead of writing "PATH_site" call "Environment::getPublicPath() . '/'"
 * Instead of writing "TYPO3_REQUESTTYPE & TYPO3_REQUESTTYPE_CLI" call "Environment::isCli()"
 */
class Environment
{
    protected static $cli;
    protected static $composerMode;
    protected static $context;
    protected static $projectPath;
    protected static $publicPath;
    protected static $currentScript;
    protected static $os;
    protected static $varPath;
    protected static $configPath;

    /**
     * Sets up the Environment. Please note that this is not public API and only used within the very early
     * Set up of TYPO3, or to be used within tests. If you ever call this method in your extension, you're probably
     * doing something wrong. Never call this method! Never rely on it!
     *
     * @param ApplicationContext $context
     * @param bool $cli
     * @param bool $composerMode
     * @param string $projectPath
     * @param string $publicPath
     * @param string $varPath
     * @param string $configPath
     * @param string $currentScript
     * @param string $os
     * @private
     */
    public static function initialize(
        ApplicationContext $context,
        bool $cli,
        bool $composerMode,
        string $projectPath,
        string $publicPath,
        string $varPath,
        string $configPath,
        string $currentScript,
        string $os
    ) {
        self::$cli = $cli;
        self::$composerMode = $composerMode;
        self::$context = $context;
        self::$projectPath = $projectPath;
        self::$publicPath = $publicPath;
        self::$varPath = $varPath;
        self::$configPath = $configPath;
        self::$currentScript = $currentScript;
        self::$os = $os;
    }

    /**
     * Delivers the ApplicationContext object, usually defined in TYPO3_CONTEXT environment variables.
     * This is something like "Production", "Testing", or "Development" or any additional information
     * "Production/Staging".
     *
     * @return ApplicationContext
     */
    public static function getContext(): ApplicationContext
    {
        return self::$context;
    }

    /**
     * Informs whether TYPO3 has been installed via composer or not. Typically this is useful inside the
     * Maintenance Modules, or the Extension Manager.
     *
     * @return bool
     */
    public static function isComposerMode(): bool
    {
        return self::$composerMode;
    }

    /**
     * Whether the current PHP request is handled by a CLI SAPI module or not.
     *
     * @return bool
     */
    public static function isCli(): bool
    {
        return self::$cli;
    }

    /**
     * The root path to the project. For installations set up via composer, this is the path where your
     * composer.json file is stored. For non-composer-setups, this is (due to legacy reasons) the public web folder
     * where the TYPO3 installation has been unzipped (something like htdocs/ or public/ on your webfolder).
     * However, non-composer-mode installations define an environment variable called "TYPO3_PATH_APP"
     * to define a different folder (usually a parent folder) to allow TYPO3 to access and store data outside
     * of the public web folder.
     *
     * @return string The absolute path to the project without the trailing slash
     */
    public static function getProjectPath(): string
    {
        return self::$projectPath;
    }

    /**
     * The public web folder where index.php (= the frontend application) is put. This is equal to the legacy constant
     * PATH_site, without the trailing slash. For non-composer installations, the project path = the public path.
     *
     * @return string
     */
    public static function getPublicPath(): string
    {
        return self::$publicPath;
    }

    /**
     * The folder where variable data like logs, sessions, locks, and cache files can be stored.
     * When project path = public path, then this folder is usually typo3temp/var/, otherwise it's set to
     * $project_path/var.
     *
     * @return string
     */
    public static function getVarPath(): string
    {
        return self::$varPath;
    }

    /**
     * The folder where all global (= installation-wide) configuration like
     * - LocalConfiguration.php,
     * - AdditionalConfiguration.php, and
     * - PackageStates.php
     * is put.
     * This folder usually has to be writable for TYPO3 in order to work.
     *
     * When project path = public path, then this folder is usually typo3conf/, otherwise it's set to
     * $project_path/config.
     *
     * @return string
     */
    public static function getConfigPath(): string
    {
        return self::$configPath;
    }

    /**
     * The path + filename to the current PHP script.
     *
     * @return string
     */
    public static function getCurrentScript(): string
    {
        return self::$currentScript;
    }

    /**
     * Whether this TYPO3 installation runs on windows
     *
     * @return bool
     */
    public static function isWindows(): bool
    {
        return self::$os === 'WINDOWS';
    }

    /**
     * Whether this TYPO3 installation runs on unix (= non-windows machines)
     *
     * @return bool
     */
    public static function isUnix(): bool
    {
        return self::$os === 'UNIX';
    }
}