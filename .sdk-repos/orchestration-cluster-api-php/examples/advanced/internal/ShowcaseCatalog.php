<?php

declare(strict_types=1);

namespace Camunda\Orchestration\Examples\Advanced\Internal;

use JsonException;
use RuntimeException;

final class ShowcaseCatalog
{
    /**
     * @return list<string>
     */
    public static function topLevelExampleSources(string $root): array
    {
        $sources = array_map('basename', glob($root . '/examples/*.php') ?: []);
        sort($sources, SORT_STRING);

        return $sources;
    }

    /**
     * @return list<array{id: string, title: string, summary: string, command: string, sources: list<string>}>
     */
    public static function load(string $root): array
    {
        $path = $root . '/examples/scenario-map.json';
        $contents = file_get_contents($path);
        if ($contents === false) {
            throw new RuntimeException("Cannot read example scenario map: $path");
        }

        try {
            $map = json_decode($contents, true, flags: JSON_THROW_ON_ERROR);
        } catch (JsonException $error) {
            throw new RuntimeException("Cannot parse example scenario map: {$error->getMessage()}", 0, $error);
        }

        if (!is_array($map) || ($map['schemaVersion'] ?? null) !== 1) {
            throw new RuntimeException('Example scenario map must use schemaVersion 1.');
        }
        if (!is_array($map['scenarios'] ?? null) || !array_is_list($map['scenarios'])) {
            throw new RuntimeException('Example scenario map must contain a scenarios list.');
        }
        if (count($map['scenarios']) !== 6) {
            throw new RuntimeException('Example scenario map must define exactly six scenarios.');
        }

        $availableSources = array_fill_keys(self::topLevelExampleSources($root), true);
        $assignedSources = [];
        $ids = [];
        $scenarios = [];

        foreach ($map['scenarios'] as $index => $scenario) {
            if (!is_array($scenario)) {
                throw new RuntimeException("Example scenario at index $index must be an object.");
            }
            $id = self::stringField($scenario, 'id', $index);
            if (preg_match('/^[a-z][a-z0-9-]*$/', $id) !== 1 || isset($ids[$id])) {
                throw new RuntimeException("Example scenario map has an invalid or duplicate id '$id'.");
            }
            $ids[$id] = true;

            $sources = self::sources($scenario, $id);
            foreach ($sources as $source) {
                if (!isset($availableSources[$source])) {
                    throw new RuntimeException("Example scenario '$id' references unknown source '$source'.");
                }
                if (isset($assignedSources[$source])) {
                    throw new RuntimeException(
                        "Example source '$source' is assigned to both '{$assignedSources[$source]}' and '$id'.",
                    );
                }
                $assignedSources[$source] = $id;
            }

            $scenarios[] = [
                'id' => $id,
                'title' => self::stringField($scenario, 'title', $id),
                'summary' => self::stringField($scenario, 'summary', $id),
                'command' => self::stringField($scenario, 'command', $id),
                'sources' => $sources,
            ];
        }

        $missing = array_diff(array_keys($availableSources), array_keys($assignedSources));
        if ($missing !== []) {
            throw new RuntimeException('Example scenario map does not assign: ' . implode(', ', $missing) . '.');
        }

        return $scenarios;
    }

    /**
     * @param list<array{id: string, title: string, summary: string, command: string, sources: list<string>}> $scenarios
     * @return array<string, string>
     */
    public static function scenarioForExampleSource(array $scenarios): array
    {
        $mapping = [];
        foreach ($scenarios as $scenario) {
            foreach ($scenario['sources'] as $source) {
                $mapping[$source] = $scenario['id'];
            }
        }

        return $mapping;
    }

    /**
     * @param array<mixed, mixed> $scenario
     */
    private static function stringField(array $scenario, string $field, string|int $context): string
    {
        $value = $scenario[$field] ?? null;
        if (!is_string($value) || trim($value) === '') {
            throw new RuntimeException("Example scenario '$context' must provide a non-empty '$field'.");
        }

        return $value;
    }

    /**
     * @param array<mixed, mixed> $scenario
     * @return list<string>
     */
    private static function sources(array $scenario, string $context): array
    {
        $values = $scenario['sources'] ?? null;
        if (!is_array($values) || !array_is_list($values)) {
            throw new RuntimeException("Example scenario '$context' must provide a sources list.");
        }

        $sources = [];
        foreach ($values as $source) {
            if (!is_string($source) || preg_match('/^[A-Za-z0-9_.-]+\.php$/', $source) !== 1) {
                throw new RuntimeException("Example scenario '$context' has an invalid source.");
            }
            if (isset($sources[$source])) {
                throw new RuntimeException("Example scenario '$context' has duplicate source '$source'.");
            }
            $sources[$source] = true;
        }

        return array_keys($sources);
    }
}
