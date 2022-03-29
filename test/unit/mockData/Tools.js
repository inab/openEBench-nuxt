export default [
	{
		_id: 'OEBT002000000E',
		name: 'OMA Groups',
		status: 'online',
		description:
			'OMA is a publicly available resource (http://omabrowser.org/) that provides orthology predictions among thousands of proteomes from all domains of life. OMA uses evolutionary distance estimates from Smith���Waterman alignments to infer orthologs. A distinct feature among graph-based methods is the witness of nonorthology step in its pipeline, where cases of differential gene losses get detected. OMA provides three different groupings of orthologs: Pairs, Groups, and HOGs. OMA Groups consists of groups of genes in which all pairs are orthologs. In a graph representation with genes as nodes and orthology relations as edge, OMA groups correspond to fully connected subgraphs. Due to this definition, each OMA group includes at most one sequence per species. The primary intended application of these groups is to provide input data for phylogenetic inference.',
		registry_tool_id: 'biotools:oma',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000M',
		name: 'PANTHER 8.0 (LDO only)',
		status: 'online',
		description:
			'The PANTHER (Protein ANalysis THrough Evolutionary Relationships) Classification System was designed to classify proteins (and their genes) in order to facilitate high-throughput analysis. PANTHER LDO will return only least diverged ortholog for each gene (single best ortholog)',
		registry_tool_id: 'biotools:panther',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000P',
		name: 'RSD',
		status: 'unknown',
		description:
			'Roundup is a large-scale orthology database. The orthologs are computed using the Reciprocal Smallest Distance (RSD) algorithm. Reciprocal Smallest Distance (RSD) is a pairwise orthology algorithm that uses global sequence alignment and maximum likelihood evolutionary distance between sequences to accurately detects orthologs between genomes. This dataset is computed using a divergence parameter of 0.8 and an E-value cutoff of 1e-5.',
		registry_tool_id: 'biotools:rsd',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0070000002',
		name: 'EnsemblCompara (e103)',
		status: 'unknown',
		description:
			'Ensembl Compara pipeline (version 103) provides cross-species resources        and analyses, at both the sequence level and the gene level. Gene        families are inferred using a hybrid approach combining TreeFam and        PANTHER HMM classification, and all-against-all BLAST search for the        sequences without HMM matches.',
		registry_tool_id: 'biotools:Ensembl_Compara',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000012',
		name: 'Domainoid+',
		status: 'unknown',
		description:
			'Domainoid is a program for automatic identification of domain-based orthologs. Domainoid builds on top of the InParanoid algorithm, and uses domains from Pfam to infer orthologs on a domain level. The domain-level-orhtologs have been reconstructed on the full protein level in order to be compatible with the benchmark, using an alpha threshold of 0.4. The Domainoid orthologs are used to enrich orthologs from InParanoid.',
		registry_tool_id: null,
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000F',
		name: 'OMA-Pairs-2.0',
		status: 'unknown',
		description:
			'The OMA Pairs are the primary product of the OMA pipeline. It is a list of high-confidence pairs of orthologous genes.OMA is based on an algorithm that compares genes on the basis of evolutionary distances, considers distance inference uncertainty, and accounts for differential gene losses.The version 2.0 has better support for fast evolving inparalogs. The changes are described in here. ',
		registry_tool_id: 'biotools:oma',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000010',
		name: 'OrthoMCL',
		status: 'unknown',
		description:
			"OrthoMCL provides a scalable method for constructing orthologous groups across a wide range of species in Eukaryota, Bacteria, and Archaea. The algorithm calculates Blast scores between every pair of proteins in order to identify putative orthologs and paralogs. The Blast scores are normalized to account for betwen-species sequence divergence. Then, OrthoMCL employs a Markov Cluster algorithm to appropriately group closely-related orthologs and paralogs. We find that groups containing proteins with previously assigned EC annotations exhibit a high degree of EC consistency, showing OrthoMCL's utility for automated eukaryotic genome annotation.",
		registry_tool_id: 'biotools:orthomcl',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000X',
		name: 'Proteinortho 6.0.13 (with isoform)',
		status: 'unknown',
		description:
			'Proteinortho is a tool to detect orthologous genes within different species. For doing so, it compares similarities of given gene sequences and clusters them to find significant groups. The algorithm was designed to handle large-scale data and can be applied to hundreds of species at one. Details can be found in Lechner et al., BMC Bioinformatics. 2011 Apr 28;12:124. ',
		registry_tool_id: null,
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000D',
		name: 'OMA-Groups-2.0',
		status: 'unknown',
		description:
			'OMA Groups consists of groups of genes in which all pairs are orthologs. In a graph representation with genes as nodes and orthology relations as edge, OMA groups correspond to fully connected subgraphs. Due to this definition, each OMA group includes at most one sequence per species. The primary intended application of these groups is to provide input data for phylogenetic inference.In this instance of OMA Groups, the pairwise orthologs are based on the relations obtained with the refinements described in OMA 2.0. Additionally, the quasi-cliques that are compatible (no overlapping species) and where at least 50% of the maximal possible edges among the clusters are present, have been merged.',
		registry_tool_id: 'biotools:oma',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000L',
		name: 'PANTHER 8.0 (all)',
		status: 'online',
		description:
			'The PANTHER (Protein ANalysis THrough Evolutionary Relationships) Classification System was designed to classify proteins (and their genes) in order to facilitate high-throughput analysis. PANTHER ALL will return all orthologs if more than one',
		registry_tool_id: 'biotools:panther',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000R',
		name: 'SonicParanoid',
		status: 'unknown',
		description:
			'version: 1.0.9 mode: sensitive Length difference threshold = 0.5 ',
		registry_tool_id: 'biotools:SonicParanoid',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000013',
		name: 'OrthoFinder-2.5.2-MSA',
		status: 'unknown',
		description:
			'OrthoFinder 2.5.2 using BLAST and multiple sequence alignment tree.Command: "orthofinder -S blast -f -M msa 2011_04_reference_proteomes/"',
		registry_tool_id: 'biotools:OrthoFinder',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000015',
		name: 'PANTHER 16.0 (LDO only)',
		status: 'online',
		description:
			'The PANTHER (Protein ANalysis THrough Evolutionary Relationships) Classification System was designed to classify proteins (and their genes) in order to facilitate high-throughput analysis. PANTHER LDO will return only least diverged ortholog for each gene (single best ortholog)',
		registry_tool_id: 'biotools:panther',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000Q',
		name: 'SonicParanoid_fast',
		status: 'unknown',
		description:
			'version: 1.0.9 mode: sensitive Length difference threshold = 0.5 ',
		registry_tool_id: 'biotools:SonicParanoid',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000B',
		name: 'MethaPhOrs',
		status: 'online',
		description:
			'MetaPhOrs is a public repository of phylogeny-based orthologs and paralogs that were computed using phylogenetic trees available in twelve public repositories',
		registry_tool_id: 'biotools:metaphors',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000T',
		name: 'OrthoFinder-2.0-DIAMOND+MSA',
		status: 'unknown',
		description:
			'OrthoFinder using trees inferred with MAFFT multiple sequence alignments and FastTree trees. Command: orthofinder -f proteomes/ -M msa  ',
		registry_tool_id: null,
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000000',
		name: 'EggNOG-5-Fine-grained',
		status: 'unknown',
		description:
			'Orthologous pair predictions from OGs refined by phylogentic trees. Three missing species were mapped to closest homolog available. ',
		registry_tool_id: 'biotools:eggnog',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000U',
		name: 'SonicParanoid_most-sensitive',
		status: 'unknown',
		description: 'version 1.2.6 ',
		registry_tool_id: 'biotools:sonicparanoid',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000011',
		name: 'OrthoFinder-2.5-MSA',
		status: 'unknown',
		description:
			'OrthoFinder 2.5 using BLAST and multiple sequence alignment tree.Command: "orthofinder -S blast -f -M msa 2011_04_reference_proteomes/"',
		registry_tool_id: 'biotools:OrthoFinder',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000016',
		name: 'OrthoInspector 3',
		status: 'online',
		description:
			'OrthoInspector is a database of precomputed orthology and inparalogy relationships and a stand-alone package allowing large-scale predictions of orthology between thousands of proteomes (http://lbgi.fr/orthoinspector/). The specific version (v1.30) for the Quest for orthologs benchmark used a 1.10-9 blast Evalue threshold. The resource has recently undergone a major new release (2.0), with improved speed and visualisation tools, but the inference algorithm is unchanged from the initial graph-based method.',
		registry_tool_id: 'biotools:orthoinspector',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000Y',
		name: 'Broccoli 1.1',
		status: 'unknown',
		description:
			'Broccoli, a user-friendly pipeline designed to infer with high precision orthologous groups and pairs of proteins using a phylogeny-based approach. Briefly, Broccoli performs ultra-fast phylogenetic analyses on most proteins and builds a network of orthologous relationships. Orthologous groups are then identified from the network using a parameter-free machine learning algorithm (label propagation). Broccoli is also able to detect chimeric proteins resulting from gene-fusion events and to assign these proteins to the corresponding orthologous groups.',
		registry_tool_id: 'biotools:broccoli',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000A',
		name: 'InParanoid',
		status: 'online',
		description:
			"InParanoid is a program for automatic identification of orthologs while differentiating between inparalogs and outparalogs. An InParanoid cluster is seeded by a reciprocally bestmatching ortholog pair, around which inparalogs are gathered independently, while outparalogs are excluded.  The InParanoid database is a collection of pairwise ortholog groups aiming to include all 'completely sequenced' eukaryotic genomes. By this we mean above 6X coverage, and less than 1% X letters in the protein sequences. Two variants were tested in this study: this one is the regular InParanoid output containing all predicted pairs of orthologs",
		registry_tool_id: 'biotools:inparanoid',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000006',
		name: 'EnsemblCompara (e81)',
		status: 'online',
		description:
			'Ensembl Compara pipeline (version 81) provides cross-species resources and analyses, at both the sequence level and the gene level, with modifications to only use amino-acid models in treebest',
		registry_tool_id: 'biotools:Ensembl_Compara',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000I',
		name: 'OrthoFinder-2.0-DIAMOND',
		status: 'unknown',
		description:
			'OrthoFinder 2.0 using DIAMOND and with default options. Command: "orthofinder -S diamond_more_sensitive -f 2011_04_reference_proteomes/" (defaults: DendroBLAST trees, species tree rooted by STRIDE, new OrthoFinder 2 orthologue inference method from gene trees)',
		registry_tool_id: 'biotools:OrthoFinder',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000004',
		name: 'EggNOG',
		status: 'online',
		description: 'A database of orthologous groups and functional annotation',
		registry_tool_id: 'biotools:eggnog',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000002',
		name: 'QfO benchmark consolidation',
		status: 'unknown',
		description:
			'Docker container that gathers benchmarking data for a QfO challenge',
		registry_tool_id: null,
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000J',
		name: 'OrthoFinder-2.0-MSA',
		status: 'unknown',
		description:
			'OrthoFinder 2.0 using BLAST and multiple sequence alignment tree.Command: "orthofinder -S blast -f -M msa 2011_04_reference_proteomes/"',
		registry_tool_id: 'biotools:OrthoFinder',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000O',
		name: 'RBH/BBH',
		status: 'unknown',
		description:
			'Reciprocal best hits. Classic method consisting of identifying the pairs of genes with mutually highest alignment score between every pair of species. Use reciprocal blastp hits as orthologs, with minimum E-value of 1e���2, keep all hits that are ���99% of the highest score.',
		registry_tool_id: 'biotools:Reciprocal_Best_Hits_-_Best_Bidirectional_Hits',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000N',
		name: 'PhylomeDB',
		status: 'online',
		description:
			'PhylomeDB is a public database for complete catalogs of gene phylogenies (phylomes).',
		registry_tool_id: 'biotools:phylomedb_v3.0',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000W',
		name: 'Proteinortho 6.0.13',
		status: 'unknown',
		description:
			'Proteinortho is a tool to detect orthologous genes within different species. For doing so, it compares similarities of given gene sequences and clusters them to find significant groups. The algorithm was designed to handle large-scale data and can be applied to hundreds of species at one. Details can be found in Lechner et al., BMC Bioinformatics. 2011 Apr 28;12:124. ',
		registry_tool_id: null,
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000S',
		name: 'SonicParanoid_sensitive',
		status: 'unknown',
		description:
			'version: 1.0.9 mode: sensitive Length difference threshold = 0.5 ',
		registry_tool_id: 'biotools:sonicparanoid',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000005',
		name: 'EnsemblCompara-e56',
		status: 'unknown',
		description:
			'Modified version of the vanilla pipeline to build trees with protein sequences only (no nucleotide sequence, no chromosome coordinates).Please be aware that the Xenopus tropicalis genes homologies are mostly wrong due to an error in the species tree used in the pipeline ',
		registry_tool_id: 'biotools:Ensembl_Compara',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000009',
		name: 'InParanoidCore',
		status: 'online',
		description:
			"InParanoid is a program for automatic identification of orthologs while differentiating between inparalogs and outparalogs. An InParanoid cluster is seeded by a reciprocally bestmatching ortholog pair, around which inparalogs are gathered independently, while outparalogs are excluded.  The InParanoid database is a collection of pairwise ortholog groups aiming to include all 'completely sequenced' eukaryotic genomes. By this we mean above 6X coverage, and less than 1% X letters in the protein sequences. Two variants were tested in this study: this one is the high-confidence set including only orthologs with InParanoid's maximum confidence score of 1.0",
		registry_tool_id: 'biotools:inparanoid',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000C',
		name: 'OMA GETHOGs',
		status: 'online',
		description:
			'OMA is a publicly available resource (http://omabrowser.org/) that provides orthology predictions among thousands of proteomes from all domains of life. OMA uses evolutionary distance estimates from Smith���Waterman alignments to infer orthologs. A distinct feature among graph-based methods is the witness of nonorthology step in its pipeline, where cases of differential gene losses get detected. OMA provides three different groupings of orthologs: Pairs, Groups, and HOGs. Here, we constructed hierarchical orthologous groups (OMA HOGs). These are nested groups that contain genes that descend from a single common ancestral gene within a given taxonomic range using the GETHOGs algorithm.',
		registry_tool_id: 'biotools:oma',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000003',
		name: 'EggNOG-5-Groups',
		status: 'unknown',
		description:
			'All-vs-all orthologous pair prediction using the smallest compatible OG in the eggNOG level hierarchy for each pair of reference species. Three missing species were mapped using eggNOG 4.5. ',
		registry_tool_id: 'biotools:eggnog',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000017',
		name: 'PhylomeDB V5',
		status: 'online',
		description:
			'PhylomeDB is a public database for complete catalogs of gene phylogenies (phylomes).',
		registry_tool_id: 'biotools:phylomedb',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000007',
		name: 'GETHOGs-2.0',
		status: 'unknown',
		description:
			'Hierarchical Orthologous Groups based on pairwise orthologs infered by OMA. The ideas and methodology are described in here, where as this version 2.0 makes use of the new bottom-up algorithm described in here. ',
		registry_tool_id: 'biotools:oma',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000001',
		name: 'QfO benchmark metrics computator',
		status: 'unknown',
		description:
			'Docker container that computes all required metrics for a Quest for Orthologs benchmark',
		registry_tool_id: null,
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000008',
		name: 'Hieranoid 2',
		status: 'online',
		description:
			'Orthology inference method using a hierarchical approach. Hieranoid performs pairwise orthology analysis using InParanoid at each node in a guide tree as it progresses from its leaves to the root. It combines efficient graph-based methodology with aspects of compute-intensive tree-based methods',
		registry_tool_id: 'biotools:hieranoid',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000V',
		name: 'Broccoli 1.0',
		status: 'unknown',
		description:
			'Broccoli, a user-friendly pipeline designed to infer with high precision orthologous groups and pairs of proteins using a phylogeny-based approach. Briefly, Broccoli performs ultra-fast phylogenetic analyses on most proteins and builds a network of orthologous relationships. Orthologous groups are then identified from the network using a parameter-free machine learning algorithm (label propagation). Broccoli is also able to detect chimeric proteins resulting from gene-fusion events and to assign these proteins to the corresponding orthologous groups.',
		registry_tool_id: 'biotools:broccoli',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000H',
		name: 'OrthoFinder-2.0-BLAST',
		status: 'unknown',
		description:
			'OrthoFinder 2.0 using BLAST and with default options. Command: "orthofinder -S blast -f 2011_04_reference_proteomes/" (defaults: DendroBLAST trees, species tree rooted by STRIDE, new OrthoFinder 2 orthologue inference from gene trees) ',
		registry_tool_id: 'biotools:OrthoFinder',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000G',
		name: 'OMA Pairs',
		status: 'online',
		description:
			'OMA is a publicly available resource (http://omabrowser.org/) that provides orthology predictions among thousands of proteomes from all domains of life. OMA uses evolutionary distance estimates from Smith���Waterman alignments to infer orthologs. A distinct feature among graph-based methods is the witness of nonorthology step in its pipeline, where cases of differential gene losses get detected. OMA provides three different groupings of orthologs: Pairs, Groups, and HOGs. The raw pairwise ortholog relationships form the OMA Pairs, a gene-centric view that lists all the orthologs for a given gene. The OMA Pairs are the primary product of the OMA pipeline. It is a list of high-confidence pairs of orthologous genes. OMA is based on an algorithm that compares genes on the basis of evolutionary distances, considers distance inference uncertainty, and accounts for differential gene losses.',
		registry_tool_id: 'biotools:oma',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000Z',
		name: 'Proteinortho 5.16b',
		status: 'unknown',
		description:
			'Proteinortho is a tool to detect orthologous genes within different species. For doing so, it compares similarities of given gene sequences and clusters them to find significant groups. The algorithm was designed to handle large-scale data and can be applied to hundreds of species at one. Details can be found in Lechner et al., BMC Bioinformatics. 2011 Apr 28;12:124. ',
		registry_tool_id: null,
		__typename: 'Tool',
	},
	{
		_id: 'OEBT0020000014',
		name: 'PANTHER 16.0 (All)',
		status: 'online',
		description:
			'The PANTHER (Protein ANalysis THrough Evolutionary Relationships) Classification System was designed to classify proteins (and their genes) in order to facilitate high-throughput analysis. PANTHER LDO will return only least diverged ortholog for each gene (single best ortholog)',
		registry_tool_id: 'biotools:panther',
		__typename: 'Tool',
	},
	{
		_id: 'OEBT002000000K',
		name: 'OrthoInspector 1.30',
		status: 'online',
		description:
			'OrthoInspector30 is a database of precomputed orthology and inparalogy relationships and a stand-alone package allowing large-scale predictions of orthology between thousands of proteomes (http://lbgi.fr/orthoinspector/). The specific version (v1.30) for the Quest for orthologs benchmark used a 1.10-9 blast Evalue threshold. The resource has recently undergone a major new release (2.0), with improved speed and visualisation tools, but the inference algorithm is unchanged from the initial graph-based method.',
		registry_tool_id: 'biotools:orthoinspector',
		__typename: 'Tool',
	},
];
